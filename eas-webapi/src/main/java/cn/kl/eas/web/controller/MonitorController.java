package cn.kl.eas.web.controller;

import cn.kl.eas.entity.Data;
import cn.kl.eas.entity.webmsg.Result;
import cn.kl.eas.service.IMonitor;
import cn.kl.eas.web.utils.ResultUtil;
import com.client.IceClientUtil;
import com.client.ServerClient;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Administrator on 2017/7/3.
 */
@RestController
@Api(tags = "MonitorApi", description = "监控信息")
public class MonitorController{

    @Autowired
    ServerClient serverClient;

    @Autowired
    IMonitor iMonitor;

    @GetMapping("/v1/monitor/{uuid}")
    @ApiOperation(value = "根据uuid获取主机使用信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "uuid", value = "uuid", dataType = "String", paramType = "path")
    })
    @ApiResponses({
            @ApiResponse(code = 200, message = "获取成功", response = java.lang.String.class)
    })
    public Result getOneCtrl(@PathVariable("uuid") String uuid) {
        return ResultUtil.success(getOne(uuid));
    }

    public String getOne(String uuid) {
        return IceClientUtil.getServerClient().getInstanceUsage(uuid);
    }



    @GetMapping("/v1/monitor/servers")
    @ApiOperation(value = "获取所有虚拟机")
    @ApiResponses({
            @ApiResponse(code = 200, message = "获取成功", response = java.lang.String.class)
    })
    public Result getServersCtrl() {
        return ResultUtil.success(getAllServers());
    }

    public String getAllServers() {
        return IceClientUtil.getServerClient().getInstanceList();
    }

    @GetMapping("/v1/monitor/{ip}/{data_id}/{type}")
    @ApiOperation(value = "获取虚拟机行为信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "ip", value = "ip", dataType = "String", paramType = "path"),
            @ApiImplicitParam(name = "data_id", value = "data_id", dataType = "Integer", paramType = "path"),
            @ApiImplicitParam(name = "type", value = "type", dataType = "String", paramType = "path")
    })
    @ApiResponses({
            @ApiResponse(code = 200, message = "获取成功", response = Data.class, responseContainer = "List")
    })
    public Result getAllServersCtrl(@PathVariable("ip") String ip, @PathVariable("data_id") Integer data_id,
                                    @PathVariable("type") String type) {
        return ResultUtil.success(getServersData(ip, data_id, type));
    }

    public List<Data> getServersData(String ip, Integer data_id, String type) {
        return iMonitor.getData(ip, data_id, type);
    }

}