package cn.kl.eas.web.common.exception;

import cn.kl.eas.web.common.enums.ResultEnum;

/**
 * Created by kl272 on 2017/4/20.
 */
public class SayException extends RuntimeException{

    private Integer code;

    public SayException(ResultEnum anEnum) {
        super(anEnum.getMsg());
        this.code = anEnum.getCode();
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }
}
