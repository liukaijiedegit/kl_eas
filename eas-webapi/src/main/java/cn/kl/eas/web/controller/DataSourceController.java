package cn.kl.eas.web.controller;

import cn.kl.eas.entity.DataSource;
import cn.kl.eas.entity.webmsg.Result;
import cn.kl.eas.service.IDataSourceService;
import cn.kl.eas.web.common.enums.ResultEnum;
import cn.kl.eas.web.common.exception.SayException;
import cn.kl.eas.web.utils.ResultUtil;
import com.sun.org.apache.regexp.internal.RE;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;

import static cn.kl.eas.web.utils.ResultUtil.success;

/**
 * Created by Administrator on 2017/6/5.
 */
@RestController
@Api(tags = "DataSourceApi", description = "数据源")
public class DataSourceController implements BaseController<DataSource>{

    @Autowired
    IDataSourceService iDataSourceService;


    @PostMapping("/v1/datasource")
    @ApiOperation(value = "上传数据源配置文件", consumes = "- multipart/form-data")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "file", value = "配置文件", required = true, dataType = "file", paramType = "form"),
    })
    @ApiResponses({
            @ApiResponse(code = 200, message = "ok!", response = DataSource.class, responseContainer = "List")
    })
    public Result upload(MultipartFile file) {
        try {
            Result result = ResultUtil.success(upload(file.getInputStream()));
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return ResultUtil.error(ResultEnum.UPLOAD_DATA_ERROR.getMsg());
        }
    }

    private DataSource upload(InputStream is) throws Exception{
        return iDataSourceService.upload(null , is);
    }

    @Override
    @Deprecated
    public DataSource save(DataSource entity) {
        return null;
    }


    /**
     * 删除数据源
     *
     * @param datasource_id 主键id
     */
    @DeleteMapping("/v1/datasource/{datasource_id}")
    @ApiOperation(value = "删除数据源")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "datasource_id", value = "数据源id", required = true, dataType = "int", paramType = "path")
    })
    @ApiResponses({
            @ApiResponse(code = 204, message = "删除成功", response = void.class)
    })
    public Result deleteCtrl(@PathVariable("datasource_id") Integer datasource_id) {
        delete(datasource_id);
        return ResultUtil.success();
    }

    @Override
    public void delete(Integer id) {
        iDataSourceService.delete(id);
    }

    @Override
    @Deprecated
    public DataSource update(DataSource entity) {
        return null;
    }


    @PutMapping("/v1/datasource/{datasource_id}")
    @ApiOperation(value = "更新数据源")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "datasource_id", value = "数据源对象", dataType = "int", paramType = "path"),
            @ApiImplicitParam(name = "file", value = "配置文件", required = true, dataType = "file", paramType = "form")

    })
    @ApiResponses({
            @ApiResponse(code = 200, message = "更新成功", response = DataSource.class)
    })
    public Result updateCtrl(@PathVariable("datasource_id") Integer datasource_id,  MultipartFile file) throws Exception{
        return ResultUtil.success(update(datasource_id, file.getInputStream()));
    }

    public DataSource update(Integer id, InputStream is) throws Exception{
        return iDataSourceService.upload(id, is);
    }

    @Override
    @Deprecated
    public DataSource getOne(Integer id) {
        return null;
    }

    @GetMapping("/v1/datasource")
    @ApiOperation(value = "获取所有数据源")
    @ApiResponses({
            @ApiResponse(code = 200, message = "获取成功", response = DataSource.class, responseContainer = "List")
    })
    public Result getAllCtrl() { return ResultUtil.success(getAll());}
    @Override
    public List<DataSource> getAll() {
        return iDataSourceService.getAll();
    }
}
