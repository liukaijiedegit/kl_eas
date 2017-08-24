package cn.kl.eas.web.utils;

import com.esotericsoftware.yamlbeans.YamlReader;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.config.YamlMapFactoryBean;
import org.springframework.beans.factory.config.YamlPropertiesFactoryBean;
import org.springframework.core.io.ClassPathResource;

import java.io.FileReader;
import java.util.Map;
import java.util.Properties;

/**
 * Created by kl272 on 2017/6/8.
 */
public class YamlUtil {
    private static final Logger logger = LogManager.getLogger(YamlUtil.class);

    public static Map<String, Object> yaml2Map(String yamlSource) {
        try {
            YamlMapFactoryBean yaml = new YamlMapFactoryBean();
            yaml.setResources(new ClassPathResource(yamlSource));
            return yaml.getObject();
        } catch (Exception e) {
            logger.error("Cannot read yaml", e);
            return null;
        }
    }

    public static Properties yaml2Properties(String yamlSource) {
        try {
            YamlPropertiesFactoryBean yaml = new YamlPropertiesFactoryBean();
            yaml.setResources(new ClassPathResource(yamlSource));
            return yaml.getObject();
        } catch (Exception e) {
            logger.error("Cannot read yaml", e);
            return null;
        }
    }

    public static Object yaml2Object(String yamlFullPath, Class<?> cls) {
        try {
            YamlReader reader = new YamlReader(new FileReader(yamlFullPath));
            Object o = reader.read(cls);
            return o;
        } catch (Exception e) {
            logger.error("Cannot read yaml", e);
            return null;
        }
    }
}