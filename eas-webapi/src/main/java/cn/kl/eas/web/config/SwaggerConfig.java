package cn.kl.eas.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Created by kl272 on 2017/4/21.
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("cn.kl.eas.web.controller"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("事件展示系统Api")
                .description("所有响应格式均为" +
                        "{\n" +
                        "  \"data\": {},\n" +
                        "  \"msg\": \"string\",\n" +
                        "  \"state\": true\n" +
                        "}。" +
                        "Api中给出的Response Class均为data中的内容。")
                .termsOfServiceUrl("http://www.kunlun2000.net/")
                .contact(new Contact("gy",
                        "http://www.kunlun2000.net/",
                        "http://www.kunlun2000.net/"))
                .version("v1")
                .build();
    }


}
