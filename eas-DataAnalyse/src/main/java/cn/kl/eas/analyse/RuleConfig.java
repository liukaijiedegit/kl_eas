package cn.kl.eas.analyse;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Created by Administrator on 2017/6/9.
 */
@Component
@ConfigurationProperties(prefix = "ruleConfig")
public class RuleConfig {
    String jarPath;
    String packageName;


    public String getJarPath() {
        return jarPath;
    }

    public void setJarPath(String jarPath) {
        this.jarPath = jarPath;
    }

    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }
}
