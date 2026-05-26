package br.com.gommo.modules.benefit.mapper;
import br.com.gommo.modules.benefit.dto.*; import br.com.gommo.modules.benefit.entity.BenefitPlan; import org.springframework.stereotype.Component;
@Component public class BenefitPlanMapper {
    public BenefitPlan toEntity(BenefitPlanRequestDto dto) {
        return BenefitPlan.builder().name(dto.getName()).benefitType(dto.getBenefitType())
            .monthlyValue(dto.getMonthlyValue()).description(dto.getDescription()).build();
    }
    public void updateEntity(BenefitPlan entity, BenefitPlanRequestDto dto) {
        entity.setName(dto.getName()); entity.setBenefitType(dto.getBenefitType());
        entity.setMonthlyValue(dto.getMonthlyValue()); entity.setDescription(dto.getDescription());
    }
    public BenefitPlanResponseDto toResponse(BenefitPlan entity) {
        return BenefitPlanResponseDto.builder().id(entity.getId()).status(entity.getStatus()).name(entity.getName())
            .benefitType(entity.getBenefitType()).monthlyValue(entity.getMonthlyValue()).description(entity.getDescription())
            .createdAt(entity.getCreatedAt()).updatedAt(entity.getUpdatedAt()).build();
    }
}
