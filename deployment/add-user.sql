-- add user
-- be very careful about using this, especially the claims! chances are you will need to modify to match your IdentityResources and ApiResources
DECLARE @userId NVARCHAR(450) = ''
DECLARE @username NVARCHAR(256) = ''
DECLARE @email NVARCHAR(256) = ''
DECLARE @passwordHash NVARCHAR(MAX) = ''
DECLARE @securityStamp NVARCHAR(MAX) = ''
DECLARE @concurrencyStamp NVARCHAR(MAX) = ''
DECLARE @phoneNumber NVARCHAR(MAX) = NULL
DECLARE @phoneNumberConfirmed bit = 0
DECLARE @twoFactorEnabled bit = 0
DECLARE @lockoutEnd datetimeoffset(7) = NULL
DECLARE @lockoutEndEnabled bit = 1
DECLARE @accessFailedCount int = 0

INSERT INTO AspnetUsers (Id,UserName,NormalizedUserName,Email,NormalizedEmail,EmailConfirmed,PasswordHash,SecurityStamp,ConcurrencyStamp,PhoneNumber,PhoneNumberConfirmed,TwoFactorEnabled,LockoutEnd,LockoutEnabled,AccessFailedCount)
VALUES (@userId, @username, UPPER(@username), @email, UPPER(@email),0,@passwordHash,@securityStamp,@concurrencyStamp,@phoneNumber,@phoneNumberConfirmed,@twoFactorEnabled,@lockoutEnd,@lockoutEndEnabled,@accessFailedCount)

INSERT INTO AspNetUserClaims (UserId,ClaimType,ClaimValue)
VALUES
(@userId, 'name', ''),
(@userId, 'given_name', ''),
(@userId, 'family_name', ''),
(@userId, 'email', ''),
(@userId, 'email_verified', '')