package com.sisp;

import com.sisp.common.utils.UUIDUtil;
import com.sisp.dao.ProjectEntityMapper;
import com.sisp.dao.QuestionnaireEntityMapper;
import com.sisp.dao.UserEntityMapper;
import com.sisp.dao.entity.*;
import com.sisp.service.UserService;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Before;


import org.junit.jupiter.api.Test;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.CollectionUtils;

import java.io.IOException;

import java.io.InputStream;
import java.util.List;
import org.apache.log4j.Logger;

//@SpringBootTest
class DemoApplicationTests {
//    @Test
//    void contextLoads() {

	//    }
	Logger log = Logger.getLogger(DemoApplicationTests.class);
//	@Test
//	public void queryUserList() throws Exception {
//		String resource = "mybatis-config.xml";
//		InputStream inputStream = Resources.getResourceAsStream(resource);
//		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
//		SqlSession sqlSession = sqlSessionFactory.openSession();
//		//创建UserMapper对象，mybatis自动生成mapper代理对象
//		UserEntityMapper userEntityMapper = sqlSession.getMapper(UserEntityMapper.class);
//		//调用userMapper的方法
//		UserEntity userEntity = new UserEntity();
//		List<UserEntity> list = userEntityMapper.queryUserList(userEntity);
//		if(CollectionUtils.isEmpty(list)){
//			// 记录error级别的信息
//		}else{
//			System.out.println(list);
//			// 记录info级别的信息
//			log.info(">>queryUserList用户列表查询测试成功");
//		}
//	}
//
//	@Test
//	public void selectUserInfo() throws Exception {
//		String resource = "mybatis-config.xml";
//		InputStream inputStream = Resources.getResourceAsStream(resource);
//		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
//		SqlSession sqlSession = sqlSessionFactory.openSession();
//		//创建UserMapper对象，mybatis自动生成mapper代理对象
//		UserEntityMapper userEntityMapper = sqlSession.getMapper(UserEntityMapper.class);
//		//调用userMapper的方法
//		UserEntity userEntity = new UserEntity();
//		userEntity.setUsername("admin");
//		userEntity.setPassword("123");
//		List<UserEntity> list = userEntityMapper.selectUserInfo(userEntity);
//		if(CollectionUtils.isEmpty(list)){
//			// 记录error级别的信息
//		}else{
//			System.out.println(list);
//			// 记录info级别的信息
//			log.info(">>qselectUserInfo用户登录测试成功");
//		}
//	}
//
//	@Test
//	public void insert() throws Exception {
//		String resource = "mybatis-config.xml";
//		InputStream inputStream = Resources.getResourceAsStream(resource);
//		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
//		SqlSession sqlSession = sqlSessionFactory.openSession();
//		//创建UserMapper对象，mybatis自动生成mapper代理对象
//		UserEntityMapper userEntityMapper = sqlSession.getMapper(UserEntityMapper.class);
//		//调用userMapper的方法
//		UserEntity userEntity = new UserEntity();
//		userEntity.setId(UUIDUtil.getOneUUID());
//		userEntity.setStatus("1");
//		userEntity.setUsername("LS");
//		userEntity.setPassword("123");
//		int i = userEntityMapper.insert(userEntity);
//		if(i==0){
//			// 记录error级别的信息
//		}else{
//			System.out.println(i);
//			// 记录info级别的信息
//			log.info(">>insert用户插入测试成功");
//		}
//	}
//
//	@Test
//	public void deleteUserByName() throws Exception {
//		String resource = "mybatis-config.xml";
//		InputStream inputStream = Resources.getResourceAsStream(resource);
//		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
//		SqlSession sqlSession = sqlSessionFactory.openSession();
//		//创建UserMapper对象，mybatis自动生成mapper代理对象
//		UserEntityMapper userEntityMapper = sqlSession.getMapper(UserEntityMapper.class);
//		//调用userMapper的方法
//		UserEntity userEntity = new UserEntity();
//		userEntity.setUsername("123");
//		int i = userEntityMapper.deleteUserByName(userEntity);
//		if(i==0){
//			// 记录error级别的信息
//		}else{
//			System.out.println(i);
//			// 记录info级别的信息
//			log.info(">>delete用户删除测试成功");
//		}
//	}

//	@Test
//	public void queryUserList() throws Exception {
//		String resource = "mybatis-config.xml";
//		InputStream inputStream = Resources.getResourceAsStream(resource);
//		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
//		SqlSession sqlSession = sqlSessionFactory.openSession();
//		//创建ProjectMapper对象，mybatis自动生成mapper代理对象
//		ProjectEntityMapper projectEntityMapper = sqlSession.getMapper(ProjectEntityMapper.class);
//		//调用projectMapper的方法
//		ProjectEntity projectEntity = new ProjectEntity();
//		List<ProjectEntity> list = projectEntityMapper.queryProjectList(projectEntity);
//		if(CollectionUtils.isEmpty(list)){
//			// 记录error级别的信息
//		}else{
//			System.out.println(list);
//			// 记录info级别的信息
//			log.info(">>queryProjectList用户列表查询测试成功");
//		}
//	}
//
//	@Test
//	public void insert() throws Exception {
//		String resource = "mybatis-config.xml";
//		InputStream inputStream = Resources.getResourceAsStream(resource);
//		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
//		SqlSession sqlSession = sqlSessionFactory.openSession();
//		//创建ProjectMapper对象，mybatis自动生成mapper代理对象
//		ProjectEntityMapper projectEntityMapper = sqlSession.getMapper(ProjectEntityMapper.class);
//		//调用projectMapper的方法
//		ProjectEntity projectEntity = new ProjectEntity();
//		projectEntity.setId(UUIDUtil.getOneUUID());
//		projectEntity.setProjectName("1");
//		projectEntity.setProjectContent("12345");
//		int i = projectEntityMapper.insert(projectEntity);
//		if(i==0){
//			// 记录error级别的信息
//		}else{
//			System.out.println(i);
//			// 记录info级别的信息
//			log.info(">>project创建测试成功");
//		}
//	}
//
//	@Test
//	public void deleteUserByName() throws Exception {
//		String resource = "mybatis-config.xml";
//		InputStream inputStream = Resources.getResourceAsStream(resource);
//		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
//		SqlSession sqlSession = sqlSessionFactory.openSession();
//		//创建ProjectMapper对象，mybatis自动生成mapper代理对象
//		ProjectEntityMapper projectEntityMapper = sqlSession.getMapper(ProjectEntityMapper.class);
//		//调用projectMapper的方法
//		ProjectEntity projectEntity = new ProjectEntity();
//		projectEntity.setId("287fb11f6a8d428db8de656ff155bea0");
//		int i = projectEntityMapper.deleteProjectById(projectEntity);
//		if(i==0){
//			// 记录error级别的信息
//		}else{
//			System.out.println(i);
//			// 记录info级别的信息
//			log.info(">>project删除测试成功");
//		}
//	}
//
//	@Test
//	public void modifyProject() throws Exception {
//		String resource = "mybatis-config.xml";
//		InputStream inputStream = Resources.getResourceAsStream(resource);
//		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
//		SqlSession sqlSession = sqlSessionFactory.openSession();
//		//创建ProjectMapper对象，mybatis自动生成mapper代理对象
//		ProjectEntityMapper projectEntityMapper = sqlSession.getMapper(ProjectEntityMapper.class);
//		//调用projectMapper的方法
//		ProjectEntity projectEntity = new ProjectEntity();
//		projectEntity.setId("21e6c180844b4ea5b6857508f58b0eef");
//		projectEntity.setProjectContent("after modify");
//		int i = projectEntityMapper.updateByPrimaryKeySelective(projectEntity);
//		if(i==0){
//			// 记录error级别的信息
//		}else{
//			System.out.println(i);
//			// 记录info级别的信息
//			log.info(">>project编辑测试成功");
//		}
//	}

//	@Test
//	public void insertQuestionnaire() throws Exception {
//		String resource = "mybatis-config.xml";
//		InputStream inputStream = Resources.getResourceAsStream(resource);
//		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
//		SqlSession sqlSession = sqlSessionFactory.openSession();
//		//QuestionnaireEntityMapper，mybatis自动生成mapper代理对象
//		QuestionnaireEntityMapper questionnaireEntityMapper = sqlSession.getMapper(QuestionnaireEntityMapper.class);
//		//调用questionnaireEntityMapper的方法
//		QuestionnaireEntity questionnaireEntity = new QuestionnaireEntity();
//		questionnaireEntity.setId("11111");
//		questionnaireEntity.setQuestionnaireName("1");
//		questionnaireEntity.setState("close");
//		questionnaireEntity.setProjectId("21e6c180844b4ea5b6857508f58b0eef");
//		questionnaireEntity.setQuestionnaireContent("12345");
//		int i = questionnaireEntityMapper.insertQuestionnaire(questionnaireEntity);
//		if(i==0){
//			// 记录error级别的信息
//		}else{
//			System.out.println(i);
//			// 记录info级别的信息
//			log.info(">>questionnaire创建问卷基本信息测试成功");
//		}
//	}

	@Test
	public void queryQuestionnaireById() throws Exception {
		String resource = "mybatis-config.xml";
		InputStream inputStream = Resources.getResourceAsStream(resource);
		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		//QuestionnaireEntityMapper，mybatis自动生成mapper代理对象
		QuestionnaireEntityMapper questionnaireEntityMapper = sqlSession.getMapper(QuestionnaireEntityMapper.class);
		//调用questionnaireEntityMapper的方法
		QuestionnaireEntity questionnaireEntity = new QuestionnaireEntity();
		questionnaireEntity.setId("1b8ba9fb9e10482297e9d2316b4dcc42");
		QuestionnaireEntity questionnaireEntity2 = questionnaireEntityMapper.queryQuestionnaireById(questionnaireEntity);
		if(questionnaireEntity2==null){
			// 记录error级别的信息
		}else{
			System.out.println(questionnaireEntity2);
			// 记录info级别的信息
			log.info(">>questionnaire根据id查找问卷信息测试成功");
		}
	}

	@Test
	public void queryQuestionnaireByProjectId() throws Exception {
		String resource = "mybatis-config.xml";
		InputStream inputStream = Resources.getResourceAsStream(resource);
		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		//QuestionnaireEntityMapper，mybatis自动生成mapper代理对象
		QuestionnaireEntityMapper questionnaireEntityMapper = sqlSession.getMapper(QuestionnaireEntityMapper.class);
		//调用questionnaireEntityMapper的方法
		QuestionnaireEntity questionnaireEntity = new QuestionnaireEntity();
		questionnaireEntity.setProjectId("21e6c180844b4ea5b6857508f58b0eef");
		List<QuestionnaireEntity> list = questionnaireEntityMapper.queryQuestionnaireByProjectId(questionnaireEntity);
		if(CollectionUtils.isEmpty(list)){
			// 记录error级别的信息
		}else{
			System.out.println(list);
			// 记录info级别的信息
			log.info(">>questionnaire根据项目id查找问卷信息测试成功");
		}
	}

//	@Test
//	public void updateQuestionnaireById() throws Exception {
//		String resource = "mybatis-config.xml";
//		InputStream inputStream = Resources.getResourceAsStream(resource);
//		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
//		SqlSession sqlSession = sqlSessionFactory.openSession();
//		//QuestionnaireEntityMapper，mybatis自动生成mapper代理对象
//		QuestionnaireEntityMapper questionnaireEntityMapper = sqlSession.getMapper(QuestionnaireEntityMapper.class);
//		//调用questionnaireEntityMapper的方法
//		QuestionnaireEntity questionnaireEntity = new QuestionnaireEntity();
//		questionnaireEntity.setId("1b8ba9fb9e10482297e9d2316b4dcc42");
//		questionnaireEntity.setQuestionnaireContent("after modify");
//		int i = questionnaireEntityMapper.updateQuestionnaireById(questionnaireEntity);
//		if(i==0){
//			// 记录error级别的信息
//		}else{
//			System.out.println(i);
//			// 记录info级别的信息
//			log.info(">>questionnaire根据id修改问卷名称与描述测试成功");
//		}
//	}

	@Test
	public void insertQuestionById() throws Exception {
		String resource = "mybatis-config.xml";
		InputStream inputStream = Resources.getResourceAsStream(resource);
		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		//QuestionEntityMapper，mybatis自动生成mapper代理对象
		QuestionnaireEntityMapper questionEntityMapper = sqlSession.getMapper(QuestionnaireEntityMapper.class);
		//调用questionEntityMapper的方法
		QuestionEntity questionEntity = new QuestionEntity();
		questionEntity.setId(UUIDUtil.getOneUUID());
		questionEntity.setQuestionnaireId("1b8ba9fb9e10482297e9d2316b4dcc42");
		questionEntity.setQuestionContent("1");
		questionEntity.setType("1");
		int i = questionEntityMapper.insertQuestionById(questionEntity);
		if(i==0){
			// 记录error级别的信息
		}else{
			System.out.println(i);
			// 记录info级别的信息
			log.info(">>question根据id添加问卷问题测试成功");
		}
	}

	@Test
	public void queryQuestionByQuestionnaireId() throws Exception {
		String resource = "mybatis-config.xml";
		InputStream inputStream = Resources.getResourceAsStream(resource);
		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		//QuestionEntityMapper，mybatis自动生成mapper代理对象
		QuestionnaireEntityMapper questionEntityMapper = sqlSession.getMapper(QuestionnaireEntityMapper.class);
		//调用questionEntityMapper的方法
		QuestionEntity questionEntity = new QuestionEntity();
		questionEntity.setQuestionnaireId("1b8ba9fb9e10482297e9d2316b4dcc42");
		List<QuestionEntity> list = questionEntityMapper.queryQuestionByQuestionnaireId(questionEntity);
		if(CollectionUtils.isEmpty(list)){
			// 记录error级别的信息
		}else{
			System.out.println(list);
			// 记录info级别的信息
			log.info(">>question根据问卷id查找问卷问题测试成功");
		}
	}

	@Test
	public void insertItemById() throws Exception {
		String resource = "mybatis-config.xml";
		InputStream inputStream = Resources.getResourceAsStream(resource);
		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		//ItemEntityMapper，mybatis自动生成mapper代理对象
		QuestionnaireEntityMapper itemEntityMapper = sqlSession.getMapper(QuestionnaireEntityMapper.class);
		//调用itemEntityMapper的方法
		ItemEntity itemEntity = new ItemEntity();
		itemEntity.setId(UUIDUtil.getOneUUID());
		itemEntity.setQuestionId("1");
		itemEntity.setItemContent("1");
		int i = itemEntityMapper.insertItemById(itemEntity);
		if(i==0){
			// 记录error级别的信息
		}else{
			System.out.println(i);
			// 记录info级别的信息
			log.info(">>item根据id添加问卷问题选项测试成功");
		}
	}

	@Test
	public void queryItemByQuestionId() throws Exception {
		String resource = "mybatis-config.xml";
		InputStream inputStream = Resources.getResourceAsStream(resource);
		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		//ItemEntityMapper，mybatis自动生成mapper代理对象
		QuestionnaireEntityMapper itemEntityMapper = sqlSession.getMapper(QuestionnaireEntityMapper.class);
		//调用itemEntityMapper的方法
		ItemEntity itemEntity = new ItemEntity();
		itemEntity.setQuestionId("856c5529ed92452fb5582171a47ebfc2");
		List<ItemEntity> list = itemEntityMapper.queryItemByQuestionId(itemEntity);
		if(CollectionUtils.isEmpty(list)){
			// 记录error级别的信息
		}else{
			System.out.println(list);
			// 记录info级别的信息
			log.info(">>item根据问题id查询问卷问题选项测试成功");
		}
	}

	@Test
	public void updateQuestionnaireState() throws Exception {
		String resource = "mybatis-config.xml";
		InputStream inputStream = Resources.getResourceAsStream(resource);
		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		//QuestionnaireEntityMapper，mybatis自动生成mapper代理对象
		QuestionnaireEntityMapper questionnaireEntityMapper = sqlSession.getMapper(QuestionnaireEntityMapper.class);
		//调用questionnaireEntityMapper的方法
		QuestionnaireEntity questionnaireEntity = new QuestionnaireEntity();
		questionnaireEntity.setId("647f1a4aa2d84ad4a4bdaa9e6295701f");
		questionnaireEntity.setState("open");
		int i = questionnaireEntityMapper.updateQuestionnaireState(questionnaireEntity);
		if(i==0){
			// 记录error级别的信息
		}else{
			System.out.println(i);
			// 记录info级别的信息
			log.info(">>questionnaire设置问卷状态测试成功");
		}
	}

	@Test
	public void updateItemCount() throws Exception {
		String resource = "mybatis-config.xml";
		InputStream inputStream = Resources.getResourceAsStream(resource);
		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		//QuestionnaireEntityMapper，mybatis自动生成mapper代理对象
		QuestionnaireEntityMapper questionnaireEntityMapper = sqlSession.getMapper(QuestionnaireEntityMapper.class);
		//调用questionnaireEntityMapper的方法
		ItemEntity itemEntity = new ItemEntity();
		itemEntity.setId("0721f950fbef4a0f858f7c059e129d79");
		int i = questionnaireEntityMapper.updateItemCount(itemEntity);
		if(i==0){
			// 记录error级别的信息
		}else{
			System.out.println(i);
			// 记录info级别的信息
			log.info(">>questionnaire设置问卷问题数测试成功");
		}
	}

}
