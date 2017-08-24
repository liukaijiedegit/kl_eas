package cn.kl.eas.web.common.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by kl272 on 2017/4/20.
 */
@Aspect
@Component
public class HttpAspect {

    public static final Logger LOGGER = LoggerFactory.getLogger(HttpAspect.class);


    @Pointcut("execution(public * cn.kl.eas.web.controller.*.*(..))")
    public void log() {

    }

    @Before("log()")
    public void doBefore(JoinPoint joinPoint) {

        System.out.println();
        LOGGER.info("========= do before ...    =========");

        //Spring web已经将请求封装好了
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        //如果是websocket的请求，则放行
        if (attributes == null)
            return;

        //使用servletAPI
        HttpServletRequest req = attributes.getRequest();
        HttpServletResponse httpServletResponse = attributes.getResponse();
        //这里填写你允许进行跨域的主机ip
        httpServletResponse.setHeader("Access-Control-Allow-Origin", "*");
        //允许的访问方法
        httpServletResponse.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
        //Access-Control-Max-Age 用于 CORS 相关配置的缓存
        httpServletResponse.setHeader("Access-Control-Max-Age", "3600");
        httpServletResponse.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


        //url
        LOGGER.info("url={}", req.getRequestURL());

        //method
        LOGGER.info("method={}", req.getMethod());

        //ip
        LOGGER.info("ip={}", req.getRemoteAddr());

        //类方法
        LOGGER.info("class_method={}.{}", joinPoint.getSignature().getDeclaringTypeName(), joinPoint.getSignature().getName());

        //参数
        LOGGER.info("args={}", joinPoint.getArgs());

    }


    @After("log()")
    public void doAfter() {
        LOGGER.info("========= do after ...     =========");
    }


    @AfterReturning(returning = "object", pointcut = "log()")
    public void  doAfterReturning(Object object) {
        LOGGER.info("========= do returning ... =========");
        if (object != null) {
            LOGGER.info(object.toString());
        }
        System.out.println();
    }



}
