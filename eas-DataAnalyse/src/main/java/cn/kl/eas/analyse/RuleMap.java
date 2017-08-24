package cn.kl.eas.analyse;

import cn.kl.eas.dao.IRulesRepo;
import cn.kl.eas.entity.Rules;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import sun.misc.ClassLoaderUtil;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.lang.reflect.Method;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/6/8.
 */
@Component
public class RuleMap implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    RuleConfig ruleConfig;

    @Autowired
    IRulesRepo iRulesRepo;

    public static final Logger LOGGER = LoggerFactory.getLogger(RuleMap.class);

    static Map<String, Method> mapRule = new HashMap<String, Method>();

    public RuleMap() {
    }

    public void init() throws MalformedURLException, ClassNotFoundException, NoSuchMethodException {
        List<Rules> rules = iRulesRepo.findAll();

        for (Rules rule : rules) {
            addRuleToMap(rule);
        }

    }

    public void add(Rules rule) throws MalformedURLException, ClassNotFoundException, NoSuchMethodException {
        LOGGER.info("=== add rule ===");
        addRuleToMap(rule);
        System.out.println(mapRule.toString());
    }

    private void addRuleToMap(Rules rule) throws MalformedURLException, ClassNotFoundException, NoSuchMethodException {

//        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
//        String root = request.getSession().getServletContext().getRealPath("/");

        String root = "";
        String jarPath = ruleConfig.getJarPath();
        jarPath = jarPath.replace("\\", "/");
        LOGGER.info("=== jar包路径：{} ===", root + jarPath + rule.getClasspath());

        /*动态加载指定类*/
        File file = new File(root + jarPath, rule.getClasspath());//类路径(包文件上一层)
        URL url = file.toURI().toURL();
        URLClassLoader loader = new URLClassLoader(new URL[]{url});
        String className = rule.getClasspath();
        className = className.substring(0, className.lastIndexOf(".jar"));
        Class<?> cls = loader.loadClass(ruleConfig.getPackageName() + className);
        Method method =  cls.getDeclaredMethod("operate",String.class,String.class);
        synchronized (mapRule.getClass()) {
            mapRule.put(rule.getName(), method);
        }
        ClassLoaderUtil.releaseLoader(loader);
    }

    public void delete(String ruleName) {
        synchronized (mapRule.getClass()) {
            mapRule.remove(ruleName);
        }
        System.out.println(mapRule.toString());
    }

    public Method getMethod(String rule) {
        return mapRule.get(rule);
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (event.getApplicationContext().getParent() == null) {
            System.out.println("=========== init RuleMap ==========");
            RuleMap ruleMap = event.getApplicationContext().getBean(RuleMap.class);
            try {
                ruleMap.init();
            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (NullPointerException e) {
                LOGGER.error("数据库中对应的jar文件缺失！");
                e.printStackTrace();
            }
        }
    }
}
