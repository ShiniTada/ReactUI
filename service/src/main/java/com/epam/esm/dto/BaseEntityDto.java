package com.epam.esm.dto;

import com.epam.esm.dto.jsonview.Views;
import com.fasterxml.jackson.annotation.JsonView;

public abstract class BaseEntityDto {

  @JsonView({Views.AllUsersView.class, Views.CurrentUsersView.class})
  protected Long id;

  public BaseEntityDto(Long id) {
    this.id = id;
  }

  public BaseEntityDto() {}

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }
}
