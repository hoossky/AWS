package com.team.web.file;

import java.io.File;
import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UploadFileUtils {
    private static final Logger logger = LoggerFactory.getLogger(UploadFileUtils.class);
    private static final String contextPath = "";
    private static final String bucketName = "";

    public static String uploadFile(String uploadPath, String originalName, byte[] byteData) throws Exception {
        S3Util s3 = new S3Util();
        UUID uid = UUID.randomUUID();


        String savedName = "/"+ originalName;

        logger.info("버킷 이름름 : "+uloadPath);

        String savedPath = "";

        String uploadedFileName = (savedPath + savedName).replace(File.separatorChar, '/');

        s3.fileUpload(bucketName, uploadPath+uploadedFileName, byteData);


        logger.info(uploadedFileName);

        return contextPath+ "/" + uploadPath  + uploadedFileName;

    }

    public static String marketUpload(String uploadPath, String originalName, byte[] byteData) throws Exception {
        S3Util s3 = new S3Util();
        UUID uid = UUID.randomUUID();

        String savedName = "/" + uid.toString() + "_" + originalName;

        logger.info("업로드 경로 : "+uploadPath);
        String savedPath = "";

        String uploadedFileName = (savedPath + savedName).replace(File.separatorChar, '/');

        s3.fileUpload(bucketName, uploadPath+uploadedFileName, byteData);


        logger.info(uploadedFileName);

        return contextPath + "/" + uploadPath + uploadedFileName;

    }

    public static String reviewUpload(String uploadPath, String originalName, byte[] byteData) throws Exception {
        S3Util s3 = new S3Util();
        UUID uid = UUID.randomUUID();

        String savedName = "/" + uid.toString() + "_" + originalName;

        logger.info("업로드 경로 : "+uploadPath);
        String savedPath = "";

        String uploadedFileName = (savedPath + savedName).replace(File.separatorChar, '/');

        s3.fileUpload(bucketName, uploadPath+uploadedFileName, byteData);


        logger.info(uploadedFileName);

        return contextPath + "/" + uploadPath + uploadedFileName;

    }

    public static String profileUploadFile(String uploadPath, String originalName, byte[] byteData) throws Exception {
        S3Util s3 = new S3Util();
        UUID uid = UUID.randomUUID();

        String savedName = "/" + uid.toString() + "_" + originalName;

        logger.info("업로드 경로 : "+uploadPath);
        String savedPath = "";

        String uploadedFileName = (savedPath + savedName).replace(File.separatorChar, '/');

        s3.fileUpload(bucketName, uploadPath+uploadedFileName, byteData);


        logger.info(uploadedFileName);

        return contextPath + "/" + uploadPath + uploadedFileName;


    }

    private static String calcPath(String uploadPath) {

        Calendar cal = Calendar.getInstance();

        String yearPath = File.separator + cal.get(Calendar.YEAR);

        String monthPath = yearPath + File.separator + new DecimalFormat("00").format(cal.get(Calendar.MONTH) + 1);

        String datePath = monthPath + File.separator + new DecimalFormat("00").format(cal.get(Calendar.DATE));

        makeDir(uploadPath, yearPath, monthPath, datePath);

        logger.info(datePath);

        return datePath;
    }

    private static void makeDir(String uploadPath, String... paths) {

        if (new File(paths[paths.length - 1]).exists()) {
            return;
        }

        for (String path : paths) {

            File dirPath = new File(uploadPath + path);

            if (!dirPath.exists()) {
                dirPath.mkdir();
            }
        }
    }
}
