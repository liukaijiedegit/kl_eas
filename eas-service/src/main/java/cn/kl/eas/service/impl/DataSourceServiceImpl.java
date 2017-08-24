package cn.kl.eas.service.impl;

import cn.kl.eas.dao.IDataSourceRepo;
import cn.kl.eas.entity.DataSource;
import cn.kl.eas.service.IDataSourceService;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.List;

/**
 * Created by Administrator on 2017/6/5.
 */
@Service
public class DataSourceServiceImpl implements IDataSourceService {

    @Autowired
    IDataSourceRepo iDataSourceRepo;

    @Override
    public DataSource upload(Integer id, InputStream is) throws Exception {
        // 获取文件编码
//        String code =  getCode(is);

        Reader reader = new InputStreamReader(is, "utf-8");
        StringBuffer buffer = new StringBuffer();
        String tmpLine; // 用来保存每行读取的内容
        BufferedReader bufferedReader = new BufferedReader(reader);

        tmpLine = bufferedReader.readLine(); // 读取第一行
        String line = null;
        for (int i = 0; i<tmpLine.length(); i++) {
            if (tmpLine.charAt(i) != '{') {
                continue;
            }
            line = tmpLine.substring(i, tmpLine.length());
            break;
        }

        while (line != null) { // 如果 line 为空说明读完了
            buffer.append(line); // 将读到的内容添加到 buffer 中
            line = bufferedReader.readLine(); // 读取下一行
        }

        JSONObject jData = JSON.parseObject(buffer.toString());

        DataSource ds = new DataSource();
        ds.setName(jData.getString("name"));
        ds.setToken(jData.getString("ID"));
        ds.setConfig(buffer.toString());

        if (id != null) {
            ds.setId(id);
        }


        return iDataSourceRepo.save(ds);
    }

//    private String getCode(InputStream is) throws IOException {
//        BufferedInputStream bin = new BufferedInputStream(is);
//        int p = (bin.read() << 8) + bin.read();
//        String code = null;
//        switch (p) {
//            case 0xefbb:
//                code = "UTF-8";
//                break;
//            case 0xfffe:
//                code = "Unicode";
//                break;
//            case 0xfeff:
//                code = "UTF-16BE";
//                break;
//            default:
//                code = "GBK";
//        }
//        return code;
//    }

    @Override
    public void delete(Integer id) {
        iDataSourceRepo.delete(id);
    }

    @Override
    public List<DataSource> getAll() {
        return iDataSourceRepo.findAll();
    }
}
