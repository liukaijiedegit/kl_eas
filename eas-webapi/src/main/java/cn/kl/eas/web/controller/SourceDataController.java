package cn.kl.eas.web.controller;

import cn.kl.eas.entity.Data;
import cn.kl.eas.entity.Rules;
import cn.kl.eas.entity.webmsg.Result;
import cn.kl.eas.service.IDataService;
import cn.kl.eas.service.IRulesService;
import cn.kl.eas.web.utils.ResultUtil;
import com.alibaba.fastjson.JSON;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

/**
 * Created by Administrator on 2017/6/6.
 */
@RestController
@Api(tags = "SourceDataApi", description = "源数据接口")
public class SourceDataController implements BaseController<Data> {

    @Autowired
    IDataService iDataService;

    @Override
    public Data save(Data entity) {
        return null;
    }

    @Override
    public void delete(Integer id) {

    }

    @Override
    public Data update(Data entity) {
        return null;
    }

    @Override
    public Data getOne(Integer id) {
        return null;
    }

    @Override
    public List<Data> getAll() {
        return iDataService.getAll();
    }


    @GetMapping("/v1/monitorData")
    @ApiOperation(value = "获取所有监控数据")
    @ApiResponses({
            @ApiResponse(code = 200, message = "获取成功", response = Data.class, responseContainer = "List")
    })
    public Result getAllCtrl() {
        return ResultUtil.success(getAll());
    }

    @GetMapping("/v1/monitorData/{ip}/all")
    @ApiOperation(value = "获取所有监控数据")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "ip", value = "虚拟机IP", dataType = "String", paramType = "path"),
    })
    @ApiResponses({
            @ApiResponse(code = 200, message = "获取成功", response = Data.class, responseContainer = "List")
    })
    public Result getAllbyIP(@PathVariable("ip") String ip) {
        return ResultUtil.success(iDataService.getDataByIP(ip));
    }

    @GetMapping("/v1/monitorData/{ip}/one")
    @ApiOperation(value = "获取所有监控数据")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "ip", value = "虚拟机IP", dataType = "String", paramType = "path"),
    })
    @ApiResponses({
            @ApiResponse(code = 200, message = "获取成功", response = Data.class, responseContainer = "JSON")
    })
    public Result getOne(@PathVariable("ip") String ip) {
        return ResultUtil.success(iDataService.getOne(ip));
    }


}
