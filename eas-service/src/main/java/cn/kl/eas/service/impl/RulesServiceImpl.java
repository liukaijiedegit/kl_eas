package cn.kl.eas.service.impl;

import cn.kl.eas.analyse.RuleConfig;
import cn.kl.eas.analyse.RuleMap;
import cn.kl.eas.dao.IRulesRepo;
import cn.kl.eas.entity.Rules;
import cn.kl.eas.service.IRulesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.net.MalformedURLException;
import java.util.List;

/**
 * Created by Administrator on 2017/6/6.
 */
@Service
public class RulesServiceImpl implements IRulesService {

    @Autowired
    RuleConfig ruleConfig;

    @Autowired
    IRulesRepo iRulesRepo;

    @Autowired
    RuleMap ruleMap;

    void saveFile(InputStream is, String fileName) throws IOException {
//        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
//        String root = request.getSession().getServletContext().getRealPath("/");

        String root = "";
        String jarPath = ruleConfig.getJarPath();
        // 替换win中的 /
        jarPath = jarPath.replace("\\", "/");

        File dirFile = new File(root + jarPath);
        if (!dirFile.exists())
            dirFile.mkdirs();

        File file = new File(root + jarPath + fileName);
        file.createNewFile();

        OutputStream os = new FileOutputStream(file);
        int bytesRead = 0;
        byte[] buffer = new byte[8192];
        while ((bytesRead = is.read(buffer, 0, 8192)) != -1) {
            os.write(buffer, 0, bytesRead);
        }
        os.close();
        is.close();
    }

    void deleteFile(String fileName) {
        File file = new File(ruleConfig.getJarPath()+fileName);
        // 路径为文件且不为空则进行删除
        if (file.isFile() && file.exists()) {
            file.delete();
        }
    }

    @Override
    @Transactional
    public Rules save(Rules entity, InputStream is) throws IOException, NoSuchMethodException, ClassNotFoundException {

        //保存jar文件
        saveFile(is, entity.getClasspath());

        Rules rules = iRulesRepo.save(entity);

        return rules;
    }

    @Override
    public void delete(Integer id) {
        //删除掉jar文件
        Rules rules = iRulesRepo.findOne(id);
        deleteFile(rules.getClasspath());
        ruleMap.delete(rules.getName());
        iRulesRepo.delete(id);
    }

    @Override
    public Rules update(Rules entity, InputStream is) throws IOException {

        if (is != null) {
            //获取现有jar文件名
            String fileName = iRulesRepo.findOne(entity.getId()).getClasspath();

            //删掉现有文件
            deleteFile(fileName);

            //保存jar文件
            saveFile(is, entity.getClasspath());
        }

        return iRulesRepo.save(entity);
    }

    @Override
    public Rules update(Rules rules) throws ClassNotFoundException, NoSuchMethodException, MalformedURLException {
        if (rules.getName() != null) {
            ruleMap.add(rules);
        }
        return iRulesRepo.save(rules);
    }

    @Override
    public List<Rules> getAll() {
        return iRulesRepo.findAll();
    }

    @Override
    public Rules getOne(Integer id) {
        return iRulesRepo.findOne(id);
    }
}
