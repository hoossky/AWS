package com.team.web.file;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.inject.Inject;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
public class UploadController {

    @ResponseBody
    @RequestMapping(value = "/imgUpload", method = RequestMethod.POST, produces = "text/plain;charset=UTF-8")
    public String uploadAjaxCoverImg(MultipartFile file) throws Exception {

        String uploadpath = "imageupload";

        ResponseEntity<String> img_path = new ResponseEntity<>(
                UploadFileUtils.uploadFile(uploadpath, file.getOriginalFilename(), file.getBytes()),
                HttpStatus.CREATED);
        String coverImagePath = (String) img_path.getBody();

        return coverImagePath;
    }

    @ResponseBody
    @RequestMapping(value = "/marketImgUpload", method = RequestMethod.POST, produces = "text/plain;charset=UTF-8")
    public String uploadPostImg(MultipartFile file) throws Exception {
        String uploadpath = "marketImage";

        ResponseEntity<String> img_path = new ResponseEntity<>(
                UploadFileUtils.marketUpload(uploadpath, file.getOriginalFilename(), file.getBytes()),
                HttpStatus.CREATED);
        return (String) img_path.getBody();
    }

}