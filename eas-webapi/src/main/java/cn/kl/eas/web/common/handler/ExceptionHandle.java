package cn.kl.eas.web.common.handler;

import cn.kl.eas.entity.webmsg.Result;
import cn.kl.eas.web.common.exception.*;
import cn.kl.eas.web.common.aspect.HttpAspect;
import cn.kl.eas.web.utils.ResultUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by kl272 on 2017/4/20.
 * 异常捕获
 */
@ControllerAdvice
public class ExceptionHandle {

    public static final Logger LOGGER = LoggerFactory.getLogger(HttpAspect.class);

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public Result handle(Exception e) {
        if(e instanceof SayException) {
            SayException sayException = (SayException) e;
            return ResultUtil.error(sayException.getMessage());
        }
        LOGGER.info("系统异常");
        e.printStackTrace();
        return ResultUtil.error("未知错误");
    }

}
