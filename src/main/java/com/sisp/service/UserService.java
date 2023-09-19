package com.sisp.service;

import com.sisp.common.utils.UUIDUtil;
import com.sisp.dao.UserEntityMapper;
import com.sisp.dao.entity.UserEntity;
import com.sisp.redis.cache.CacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserService {
    @Autowired
    private UserEntityMapper userEntityMapper;

    @Autowired
    private CacheService cacheService;

    /**
     * 查询用户
     */
    public List<UserEntity> selectUserInfo(UserEntity userEntity) {
        List<UserEntity> result = userEntityMapper.selectUserInfo(userEntity);
        return result;
    }

    /**
     * 查询用户列表
     */
    public List<UserEntity> queryUserList(UserEntity userEntity) {
        List<UserEntity> result = userEntityMapper.queryUserList(userEntity);
        for (UserEntity user:result) {
            cacheService.add(user.getUsername(), user);
        }
        return result;
    }

    /**
     * 创建用户基本信息
     */
    public int addUserinfo(UserEntity userEntity) {
        userEntity.setId(UUIDUtil.getOneUUID());
        int result = userEntityMapper.insert(userEntity);
        if (result != 0){
            return 3;   //3表示用户存在
        }
        else {
            cacheService.add(userEntity.getUsername(), userEntity);
            return result;
        }
    }

    /**
     * 根据id删除用户信息
     */
    public int deleteUserByName(UserEntity userEntity) {
        int result = userEntityMapper.deleteUserByName(userEntity);
        cacheService.delete(userEntity.getUsername());
        return result;
    }

    /**
     * 编辑用户信息
     */
    public int modifyUserInfo(UserEntity userEntity) {
        int result = userEntityMapper.updateByPrimaryKeySelective(userEntity);
        cacheService.add(userEntity.getUsername(), userEntity);
        return result;
    }
}
