package com.epam.esm.service.impl;

import com.epam.esm.dto.GiftCertificateDto;
import com.epam.esm.dto.PaginationResult;
import com.epam.esm.dto.TagDto;
import com.epam.esm.entity.GiftCertificate;
import com.epam.esm.entity.Tag;
import com.epam.esm.exception.ServiceException;
import com.epam.esm.exception.WrongInputDataException;
import com.epam.esm.mapper.GiftCertificateModelMapper;
import com.epam.esm.mapper.TagModelMapper;
import com.epam.esm.repository.GiftCertificateRepository;
import com.epam.esm.service.GiftCertificateService;
import com.epam.esm.service.TagService;
import com.epam.esm.specification.giftcertficate.GetAllGiftCertificatesSpecification;
import com.epam.esm.specification.giftcertficate.GetGiftCertificateByIdSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class GiftCertificateServiceImpl implements GiftCertificateService {

  private static final int MIN_NAME_LENGTH = 3;
  private static final int MAX_NAME_LENGTH = 30;
  private static final int MAX_DESCRIPTION_LENGTH = 250;
  private static final double MIN_PRICE_VALUE = 0.0;
  private static final int MIN_DURATION_VALUE = 1;

  @Autowired private GiftCertificateRepository giftCertificateRepository;

  @Autowired private GiftCertificateModelMapper giftCertificateModelMapper;

  @Autowired private TagModelMapper tagModelMapper;

  @Autowired private TagService tagService;

  @Override
  public PaginationResult getAll(String sort, int pageNumber, int maxResults) {
    List<GiftCertificate> giftCertificates =
        giftCertificateRepository.getListBySpecification(
            new GetAllGiftCertificatesSpecification(sort), pageNumber, maxResults);
    int totalPages =
        (int)
            Math.ceil(
                (double)
                        giftCertificateRepository.getMaxAvailableResultsOfGetListBySpecification(
                            new GetAllGiftCertificatesSpecification(sort))
                    / maxResults);
    return new PaginationResult(
        convertGiftCertificatesToDtoAndAddTags(giftCertificates), totalPages);
  }

  @Override
  public GiftCertificateDto getById(long id) {
    GiftCertificate giftCertificate =
        giftCertificateRepository.getBySpecification(new GetGiftCertificateByIdSpecification(id));
    if (giftCertificate != null) {
      GiftCertificateDto giftCertificateDto = giftCertificateModelMapper.toDto(giftCertificate);

      List<TagDto> tagDtos = tagService.getTagsByGiftCertificateId(giftCertificate.getId(), null);
      giftCertificateDto.setListTagDto(tagDtos);
      return giftCertificateDto;
    } else {
      return null;
    }
  }

  @Override
  public PaginationResult getGiftCertificatesByUsersId(
      long id, String sort, int pageNumber, int maxResults) {
    List<GiftCertificate> giftCertificates =
        giftCertificateRepository.getListByUsersId(id, sort, pageNumber, maxResults);
    int totalPages =
        (int)
            Math.ceil(
                (double)
                        giftCertificateRepository.getMaxAvailableResultsOfGetListByUsersId(id, sort)
                    / maxResults);
    return new PaginationResult(
        convertGiftCertificatesToDtoAndAddTags(giftCertificates), totalPages);
  }

  @Override
  public PaginationResult getGiftCertificates(
      GiftCertificateDto giftCertificateDto, String sort, int pageNumber, int maxResults) {
    GiftCertificate giftCertificate = giftCertificateModelMapper.toEntity(giftCertificateDto);
    List<GiftCertificate> certificates = new ArrayList<>();
    boolean haveNameOrDescription =
        (giftCertificate.getName() != null || giftCertificate.getDescription() != null);
    if (haveNameOrDescription) {
      certificates =
          giftCertificateRepository.getListByPartNameOrDescription(giftCertificate, sort);
    }

    if (giftCertificateDto.getListTagDto() != null) {
      List<GiftCertificate> certificatesByTag = new ArrayList<>();
      List<Tag> tags = tagModelMapper.listToEntity(giftCertificateDto.getListTagDto());
      for (Tag tag : tags) {
        List<GiftCertificate> byTag = giftCertificateRepository.getListByTag(tag, sort);
        if (!certificatesByTag.isEmpty()) {
          certificatesByTag.retainAll(byTag);
        } else {
          certificatesByTag = byTag;
        }
      }

      if (!haveNameOrDescription) {
        certificates = certificatesByTag;
      } else if (!certificates.isEmpty()) {
        certificates.retainAll(certificatesByTag);
      }
    }

    List<GiftCertificate> finalGiftCertificates = new ArrayList<>();
    int firstElem = (pageNumber - 1) * maxResults;
    for (int count = 0;
        !(firstElem >= certificates.size() || count >= maxResults);
        count++, firstElem++) {
      finalGiftCertificates.add(certificates.get(firstElem));
    }
    int totalPages = (int) Math.ceil((double) certificates.size() / maxResults);
    return new PaginationResult(
        convertGiftCertificatesToDtoAndAddTags(finalGiftCertificates), totalPages);
  }

  @Override
  public GiftCertificateDto create(GiftCertificateDto giftCertificateDto) {
    validate(giftCertificateDto);
    GiftCertificate giftCertificate =
        giftCertificateRepository.create(giftCertificateModelMapper.toEntity(giftCertificateDto));
    if (giftCertificate == null) {
      throw new ServiceException("Server error. Gift certificate not added.");
    }
    giftCertificateDto.setId(giftCertificate.getId());

    tagService.createTags(giftCertificateDto);

    giftCertificateDto = giftCertificateModelMapper.toDto(giftCertificate);
    List<TagDto> tagDtos = tagService.getTagsByGiftCertificateId(giftCertificate.getId(), null);
    giftCertificateDto.setListTagDto(tagDtos);
    return giftCertificateDto;
  }

  @Override
  public GiftCertificateDto update(long id, GiftCertificateDto giftCertificateDto) {
    validate(giftCertificateDto);
    giftCertificateDto.setId(id);
    GiftCertificate newG = giftCertificateModelMapper.toEntity(giftCertificateDto);
    GiftCertificate outGiftCertificate = giftCertificateRepository.update(newG);
    if (outGiftCertificate == null) {
      throw new ServiceException("Server error. Gift certificate does not updated.");
    }
    tagService.createTags(giftCertificateDto);

    giftCertificateDto = giftCertificateModelMapper.toDto(outGiftCertificate);
    List<TagDto> tagDtos = tagService.getTagsByGiftCertificateId(outGiftCertificate.getId(), null);
    giftCertificateDto.setListTagDto(tagDtos);
    return giftCertificateDto;
  }

  @Override
  public GiftCertificateDto updatePrice(Long giftCertificateId, BigDecimal price) {
    if (price == null) {
      throw new WrongInputDataException("Price is required");
    } else if (price.doubleValue() < 0.0) {
      throw new WrongInputDataException("Wrong price value: " + price);
    }
    GiftCertificate oldG =
        giftCertificateRepository.getBySpecification(
            new GetGiftCertificateByIdSpecification(giftCertificateId));
    oldG.setPrice(price);
    GiftCertificate outGiftCertificate = giftCertificateRepository.update(oldG);
    if (outGiftCertificate == null) {
      throw new ServiceException("Server error. Gift certificate does not updated.");
    }
    GiftCertificateDto giftCertificateDto = giftCertificateModelMapper.toDto(outGiftCertificate);
    List<TagDto> tagDtos = tagService.getTagsByGiftCertificateId(outGiftCertificate.getId(), null);
    giftCertificateDto.setListTagDto(tagDtos);
    return giftCertificateDto;
  }

  private void validate(GiftCertificateDto giftCertificateDto) {

    List<String> exceptionMessages = new ArrayList<>();
    if (giftCertificateDto.getName() == null) {
      exceptionMessages.add("Name is required.");
    } else if (giftCertificateDto.getName().length() < MIN_NAME_LENGTH
        || giftCertificateDto.getName().length() > MAX_NAME_LENGTH) {
      exceptionMessages.add("Name should be between " + MIN_NAME_LENGTH + " and " + MAX_NAME_LENGTH + " characters.");
    }
    if (giftCertificateDto.getDescription() != null
        && giftCertificateDto.getDescription().length() > MAX_DESCRIPTION_LENGTH) {
      exceptionMessages.add("Description must be less than " + MAX_DESCRIPTION_LENGTH + " characters.");
    }
    if (giftCertificateDto.getPrice() == null) {
      exceptionMessages.add("Price is required");
    } else if (giftCertificateDto.getPrice().doubleValue() < MIN_PRICE_VALUE) {
      exceptionMessages.add("Wrong price value: " + giftCertificateDto.getPrice());
    }
    if (giftCertificateDto.getDurationInDays() < MIN_DURATION_VALUE) {
      exceptionMessages.add("Wrong duration value: " + giftCertificateDto.getDurationInDays());
    }
    if (!exceptionMessages.isEmpty()) {
      throw new WrongInputDataException(exceptionMessages);
    }
  }

  private List<GiftCertificateDto> convertGiftCertificatesToDtoAndAddTags(
      List<GiftCertificate> giftCertificates) {
    List<GiftCertificateDto> giftCertificateDtos = new ArrayList<>();
    for (GiftCertificate certificate : giftCertificates) {
      List<TagDto> tagDtos = tagService.getTagsByGiftCertificateId(certificate.getId(), null);
      GiftCertificateDto cdto = giftCertificateModelMapper.toDto(certificate);
      cdto.setListTagDto(tagDtos);
      giftCertificateDtos.add(cdto);
    }
    return giftCertificateDtos;
  }

  @Override
  public void deleteById(long id) {
    giftCertificateRepository.delete(new GiftCertificate(id));
  }

  @Override
  public boolean isDeleted(Long id) {
    GiftCertificate giftCertificate =
        giftCertificateRepository.getBySpecification(new GetGiftCertificateByIdSpecification(id));
    if (giftCertificate == null) {
      return true;
    } else {
      return giftCertificate.isDeleted();
    }
  }
}
