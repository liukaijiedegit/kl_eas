package cn.kl.eas.web.common.enums;

/**
 * Created by kl272 on 2017/4/20.
 */
public enum ResultEnum {

    UNKNOWN_ERROR(-1, "未知错误"),
    UPLOAD_DATA_ERROR(-2, "上传数据源错误，请检查其编码（utf-8）或内容"),
    UPLOAD_RULES_ERROR(-3, "上传规则错误"),
    SUCCESS(0, "成功") ;


    private Integer code;

    private String msg;

    ResultEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public Integer getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
