package br.com.gommo.modules.leave.dto;
import br.com.gommo.modules.leave.entity.LeaveTypeEnum; import jakarta.validation.constraints.NotNull; import java.time.LocalDate; import java.util.UUID; import lombok.*;
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class LeaveRequestRequestDto {
    @NotNull private UUID collaboratorId; private LeaveTypeEnum leaveType;
    @NotNull private LocalDate startDate; @NotNull private LocalDate endDate; private Boolean approved; private String notes;
}
