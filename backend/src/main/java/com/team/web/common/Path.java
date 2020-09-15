package com.team.web.common;

public enum Path {
    UPLOAD_PATH;
    @Override
    public String toString() {
        String result = "";
        switch(this) {
            case UPLOAD_PATH:
                result = "C:\\Users\\user\\Documents\\IzzI_backend\\src\\main\\resources\\static\\images\\";
                /*result = "C:\\Users\\user\\Documents\\Team_ProjectMaster\\src\\assets\\img\\";*/
                break;

        }

        return result;
    }
}
