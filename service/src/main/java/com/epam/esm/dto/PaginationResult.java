package com.epam.esm.dto;

import java.util.List;

public class PaginationResult {

  private List<? extends BaseEntityDto> list;

  private int totalPages;

  public PaginationResult(List<? extends BaseEntityDto> list, int totalPages) {
    this.list = list;
    this.totalPages = totalPages;
  }

  public List<? extends BaseEntityDto> getList() {
    return list;
  }

  public void setList(List<? extends BaseEntityDto> list) {
    this.list = list;
  }

  public int getTotalPages() {
    return totalPages;
  }

  public void setTotalPages(int totalPages) {
    this.totalPages = totalPages;
  }
}
