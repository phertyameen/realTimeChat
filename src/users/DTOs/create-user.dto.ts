import {   IsString,   IsEmail,   IsNotEmpty,   IsEnum,   IsOptional,   Validate,   MaxLength,   Matches,   ValidatorConstraint,   ValidatorConstraintInterface,   ValidationArguments, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { userRole } from '../Enums/userRole.enum';
import { Transform } from 'class-transformer';

/**
 * ValidatorConstraint: Custom validation class to ensure that
 * the confirmPassword field matches the password field.
 */
@ValidatorConstraint({ name: 'MatchPasswords', async: false })
export class MatchPasswordsConstraint implements ValidatorConstraintInterface {
  /**
   * Validates whether the confirmPassword field matches the password field.
   * @param confirmPassword - The confirm password input.
   * @param args - Validation arguments.
   * @returns Boolean indicating if passwords match.
   */
  validate(confirmPassword: string, args: ValidationArguments): boolean {
    const object = args.object as CreateUserDto;
    if (!object.password) return false; // Ensure password is present
    return confirmPassword === object.password;
  }

  /**
   * Returns the default error message for password mismatch.
   * @param args - Validation arguments.
   * @returns Error message string.
   */
  defaultMessage(args: ValidationArguments): string {
    return 'Password and confirm password do not match';
  }
}

/**
 * DTO for creating a user.
 */
export class CreateUserDto {
  /**
   * First name of the user.
   */
  @ApiProperty({
    type: 'string',
    example: 'Fatima',
    description: 'First name field',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  /**
   * Last name of the user.
   */
  @ApiProperty({
    type: 'string',
    example: 'Aminu',
    description: 'Last name field',
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  lastName: string;

  /**
   * Email field (must be unique).
   */
  @ApiProperty({
    type: 'string',
    example: 'fatimaaminu@mail.com',
    description: 'Email field',
  })
  @IsEmail()
  @MaxLength(150)
  @Column({ unique: true, length: 150 })
  email: string;

  /**
   * Password field with specific validation rules.
   */
  @ApiProperty({
    type: 'string',
    example: '@Password123',
    description: 'Password should contain a number, alphabets, and an uppercase letter',
  })
  @IsString()
  @MaxLength(225)
  @Matches(
    /^(?=.*[!@#$%^&])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
    {
      message:
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  password?: string;

  /**
   * Confirm password field, must match the password.
   */
  @ApiProperty({
    type: 'string',
    example: '@Password123',
    description: 'Must contain numbers, alphabets, uppercase letters, and match the password',
  })
  @IsString()
  @MaxLength(225)
  @Validate(MatchPasswordsConstraint)
  confirmpassword?: string;

  /**
   * User role (default is USER if not provided).
   */
  @ApiProperty({
    enum: userRole,
    description: 'Role of the user',
  })
  @IsEnum(userRole)
  @IsOptional()
  @Transform(({ value }) => value ?? userRole.USER)
  userRole?: userRole;

  /**
   * Google ID (used for OAuth authentication).
   */
  @ApiProperty({
    type: 'string',
    example: 'poiuytrdspoiuytrewa\zxcvbnmml;poiuytrdsdcvbnm]',
    description: 'This is auto-generated from Google when you sign up with Google',
  })
  @IsString()
  @IsOptional()
  @MaxLength(225)
  googleId?: string;
}
