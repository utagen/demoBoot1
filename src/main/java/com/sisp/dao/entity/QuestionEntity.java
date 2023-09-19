package com.sisp.dao.entity;

import java.io.Serializable;
public class QuestionEntity {
    private String id;
    private String userId;
    private String projectId;
    private String questionnaireId;
    private int pos;
    private String type;
    private String mustAnswer;
    private String questionContent;
    private String title;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getQuestionnaireId() {
        return questionnaireId;
    }

    public void setQuestionnaireId(String questionnaireId) {
        this.questionnaireId = questionnaireId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getQuestionContent() {
        return questionContent;
    }

    public void setQuestionContent(String questionContent) {
        this.questionContent = questionContent;
    }

    public String getMustAnswer() {
        return mustAnswer;
    }

    public void setMustAnswer(String mustAnswer) {
        this.mustAnswer = mustAnswer;
    }

    public int getPos() {
        return pos;
    }

    public void setPos(int pos) {
        this.pos = pos;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return "QuestionEntity{" +
                "id='" + id + '\'' +
                ", userId='" + userId + '\'' +
                ", projectId='" + projectId + '\'' +
                ", questionnaireId='" + questionnaireId + '\'' +
                ", pos=" + pos +
                ", type='" + type + '\'' +
                ", mustAnswer='" + mustAnswer + '\'' +
                ", questionContent='" + questionContent + '\'' +
                ", title='" + title + '\'' +
                '}';
    }
}
