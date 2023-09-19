package com.sisp.beans;

public class HttpResponseEntity {
    private String code;    //状态码
    private Object data;     //返回数据
    private String massage;     //状态消息

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMassage() {
        return massage;
    }

    public void setMassage(String massage) {
        this.massage = massage;
    }

    @Override
    public String toString() {
        return "HttpResponseEntity{" +
                "code='" + code + '\'' +
                ", data='" + data + '\'' +
                ", massage='" + massage + '\'' +
                '}';
    }
}
