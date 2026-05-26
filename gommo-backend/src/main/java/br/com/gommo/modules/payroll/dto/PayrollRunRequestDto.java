package br.com.gommo.modules.payroll.dto;
import br.com.gommo.modules.payroll.entity.PayrollStatusEnum; import jakarta.validation.constraints.NotNull; import java.time.OffsetDateTime; import java.util.UUID; import lombok.*;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class PayrollRunRequestDto {
    private UUID companyId; @NotNull private Integer referenceYear; @NotNull private Integer referenceMonth;
    private PayrollStatusEnum payrollStatus; private OffsetDateTime processedAt; private String notes;
}
