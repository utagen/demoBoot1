package com.sisp.dao.entity;

public class ItemEntity {
    private String id;
    private String userId;
    private String projectId;
    private String questionnaireId;
    private String questionId;
    private int pos;
    private String itemContent;
    private int itemCount;
    private int titlePos;

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

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public int getPos() {
        return pos;
    }

    public void setPos(int pos) {
        this.pos = pos;
    }

    public String getItemContent() {
        return itemContent;
    }

    public void setItemContent(String itemContent) {
        this.itemContent = itemContent;
    }

    public int getItemCount() {
        return itemCount;
    }

    public void setItemCount(int itemCount) {
        this.itemCount = itemCount;
    }

    public int getTitlePos() {
        return titlePos;
    }

    public void setTitlePos(int titlePos) {
        this.titlePos = titlePos;
    }

    @Override
    public String toString() {
        return "ItemEntity{" +
                "id='" + id + '\'' +
                ", userId='" + userId + '\'' +
                ", projectId='" + projectId + '\'' +
                ", questionnaireId='" + questionnaireId + '\'' +
                ", questionId='" + questionId + '\'' +
                ", pos=" + pos +
                ", itemContent='" + itemContent + '\'' +
                ", itemCount=" + itemCount +
                ", titlePos=" + titlePos +
                '}';
    }
}
