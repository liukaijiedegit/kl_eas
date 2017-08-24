package cn.kl.eas.web.controller;

import java.io.File;
import java.io.IOException;

/**
 * Created by kl272 on 2017/6/7.
 */
public class RulesControllerTest {

    public static void file() throws IOException {

        File file = new File("E:\\1.txt");

        boolean rs = file.createNewFile();

        System.out.println(rs);
    }

    public static void main(String[] args) throws IOException {
        file();
    }

}
