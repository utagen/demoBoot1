package com.sisp.service;

import com.sisp.dao.UserEntityMapper;
import com.sisp.dao.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sisp.common.utils.UUIDUtil;
import javax.xml.ws.soap.Addressing;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserEntityMapper userEntityMapper;
    /*
    * 登录
    * */
    public List<UserEntity> selectUserInfo(UserEntity userEntity){
        List<UserEntity> result=userEntityMapper.selectUserInfo(userEntity);
        return result;
    }
    /*
     * 查询用户列表
     * */
    public List<UserEntity> queryUserList(UserEntity userEntity){
        List<UserEntity> result=userEntityMapper.queryUserList(userEntity);
        System.out.println("用户列表如下（测试只取0号元素）");
        System.out.println(result.get(0));
        return result;
    }
    /*
    * 创建用户
    * */
    public int addUserInfo(UserEntity userEntity){
        userEntity.setId(UUIDUtil.getOneUUID());
        //获取当前时间，并设置成creationDate
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println(formatter.format(date));
        userEntity.setCreationDate(date);
        int userResult=userEntityMapper.insert(userEntity);
        if(userResult!=0){
            return 3;//3代表用户存在
        }else{
            return userResult;
        }

    }
    /*
    修改用户信息
     */

    public int modifyUserInfo(UserEntity userEntity){
        //获取当前时间，并设置成lastUpdateDate
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println(formatter.format(date));
        userEntity.setLastUpdateDate(date);
        int userResult = userEntityMapper.updateByPrimaryKey(userEntity);
        System.out.println("将要修改");
        System.out.println(userResult);
        return userResult;
    }

    /*删除用户信息
    */
    public int deleteUserByName(UserEntity userEntity){
        int userResult = userEntityMapper.deleteUserByName(userEntity);
        return userResult;
    }
}
