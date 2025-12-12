import { IsString,  IsOptional , IsNotEmpty  , Validate} from 'class-validator';
import { SubmissionExists } from '../../submitions/validators/submission-exists.validator';

export class EditSubmissionDto {
    @IsString()
    @IsNotEmpty({ message: 'Submission ID is required' })
    @Validate(SubmissionExists, { message: 'Submission does not exist' })
    SubmissionID: string;


  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  points?: number;
}
