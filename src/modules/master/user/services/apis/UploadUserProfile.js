const { v4: uuidv4 } = require("uuid");
const httpStatus = require("http-status");
const ApiError = require("@src/utils/ApiError");

class UploadUserProfile {
  constructor({ image }) {
    this.image = image;
  }

  async call() {
    if (!this.image) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Image is required");
    }

    const imageName = uuidv4();
    const imagePath = `profile/${imageName}`;
    // const { publicUrl } = await awsS3Uploader({
    //   file: this.image,
    //   imageName,
    //   imagePath,
    // });do

    // let currentProfile = await this.tenantDatabase.SettingLogo.findOne();
    // if (!currentProfile) {
    //   currentProfile = await this.tenantDatabase.SettingLogo.create({
    //     path: imagePath,
    //     publicUrl,
    //     createdBy: this.user.id,
    //     updatedBy: this.user.id,
    //   });

    //   return { profile: currentProfile };
    // }

    // currentProfile = await currentProfile.update({
    //   path: imagePath,
    //   publicUrl,
    //   updatedBy: this.user.id,
    // });

    return { profile: imagePath };
  }
}

module.exports = UploadUserProfile;
