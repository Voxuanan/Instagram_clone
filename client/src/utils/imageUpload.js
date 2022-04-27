export const checkImage = (files) => {
    let err = "";
    let NewImages = [];
    files.forEach((file) => {
        if (!file) err = "File does not exist";
        else if (file.size > 1024 * 1024) err = "The largest image size is 1mb";
        else if (file.type !== "image/jpeg" && file.type !== "image/png")
            err = "Image format is incorrect";
        else NewImages.push(file);
    });
    return { err, NewImages };
};

export const imageUpload = async (images) => {
    let imgArr = [];
    for (const image of images) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "pkvtmnjj");
        formData.append("cloud_name", "dgcuiishb");
        const res = await fetch("https://api.cloudinary.com/v1_1/dgcuiishb/upload", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        imgArr.push({ public_id: data.public_id, url: data.secure_url });
    }
    return imgArr;
};
