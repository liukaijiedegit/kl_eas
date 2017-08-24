package cn.kl.eas.web.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by kl272 on 2017/4/24.
 */
@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter{

    //为ws.HTML 提供便捷的路径映射。
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/ws").setViewName("/ws");
    }

}
