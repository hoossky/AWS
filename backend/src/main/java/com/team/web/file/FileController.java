package com.team.web.file;

import com.team.web.board.BoardRepository;
import com.team.web.common.Box;
import com.team.web.common.FileHandler;
import com.team.web.common.Path;
import com.team.web.order.OrderRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.io.File;
import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
@RequestMapping("/file")
public class FileController {
    private final FileService fileService;
    private final FileHandler fileHandler;
    private final OrderRepository orderRepository;
    private final BoardRepository boardRepository;
    private final Box box;



    public FileController(FileService fileService, FileHandler fileHandler, OrderRepository orderRepository, BoardRepository boardRepository, Box box) {
        this.fileService = fileService;
        this.fileHandler = fileHandler;
        this.orderRepository = orderRepository;
        this.boardRepository = boardRepository;
        this.box = box;

    }

    @PostMapping("/upload/{orderId}/{boardId}")
    public void postFile(@RequestParam("file") MultipartFile file, @PathVariable String orderId, @PathVariable String boardId) {
        com.team.web.file.File saveFile = new  com.team.web.file.File();
        String fname = file.getOriginalFilename();
        saveFile.setFileName(fname);
        String extension = fname.substring(fname.lastIndexOf(".") + 1);
        saveFile.setExtension(extension);
        saveFile.setContentType(file.getContentType());
        String uploadFolder = Path.UPLOAD_PATH.toString();
      if(!orderId.equals("null")){
          saveFile.setOrder(orderRepository.findByOrderId(orderId).get());
        }else if(!boardId.equals("null")) {
          saveFile.setBoard(boardRepository.findByBoardId(boardId));
        }
        fileHandler.uploadFile(file, uploadFolder);
        fileService.save(saveFile);
    }

    @GetMapping("/list/{fileId}")
    public HashMap<?, ?> findList(@PathVariable Long fileId) {
        box.clear();
        box.put("fileList", fileService.findAll());
        return box.get();
    }
    @GetMapping("/list/subject/{subjectId}")
    public HashMap<?,?> subjectFileList(@PathVariable Long subjectId){
        box.clear();
        box.put("fileList",fileService.findBySubjectId(subjectId));
        System.out.println(fileService.findBySubjectId(subjectId));
        return box.get();
    }


    @GetMapping("/download/{fileId}")
    public StreamingResponseBody getFile(@PathVariable Long fileId, HttpServletResponse response) throws IOException {
        System.out.println("download 요청 "+fileId);
        com.team.web.file.File file = fileService.findById(fileId.toString()).get();
        response.setContentType(file.getContentType());
        response.setHeader("Content-Disposition", "attachment; filename=\"webpage." + file.getExtension() + "\"");
        InputStream inputStream = new FileInputStream(new File(Path.UPLOAD_PATH.toString() + "izzi\\" + file.getFileName()));
        return outputStream -> {
            int nRead;
            byte[] data = new byte[1024];
            while ((nRead = inputStream.read(data, 0, data.length)) != -1) {
                outputStream.write(data, 0, nRead);
            }
            inputStream.close();
        };
    }

    @GetMapping("/geturi/{orderId}")
    public List<String>  getURI(@PathVariable Long orderId){
        System.out.println("geturi"+orderId);
        return fileService.getFileName(orderId);
    }
    @GetMapping("/getfilename/{orderId}")
    public List<String> getName(@PathVariable Long orderId){
        return fileService.getOnlyFileName(orderId);
    }

    @GetMapping("/delete/{fileId}")
    public void deleteFile(@PathVariable String fileId){

        fileService.delete(fileId);
      com.team.web.file.File file = fileService.findById(fileId.toString()).get();
        System.out.println(file);
        File deleteFile = new File(Path.UPLOAD_PATH.toString()+"pickle\\"+file.getFileName());
        if(deleteFile.exists()){
            deleteFile.delete();
            System.out.println("파일 삭제");
        }else {
            System.out.println("파일이 존재하지 않음");
        }
    }

}
