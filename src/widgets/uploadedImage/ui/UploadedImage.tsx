import { dragProps } from '@pages/imagePalette/types/dragParams';

import classes from './uploadedImage.module.css';

export const UploadedImage = (params: dragProps) => {
  const {
    uploadedImg,
    dragStartHandler,
    dragLeaveHandler,
    dragHandler,
    fileSelectedHandler,
  } = params;

  return (
    <section className={classes.wrapper}>
      <div className={classes.Info}>
        <h1 className={classes.title}>That is your palette!</h1>
        <div className={classes.textInfo}>
          <p>We split your image and got some colors.</p>
          <p>
            To copy a color in <strong>HEX</strong> format, click on the color.
            Or select the icon next to colour name to get more information about
            the colour
          </p>
        </div>
      </div>
      <div className={classes.UploadWrapper}>
        <label>
          <div
            className={classes.dragWrapper}
            onDragStart={dragStartHandler}
            onDragOver={dragStartHandler}
            onDragLeave={dragLeaveHandler}
            onDrop={(event) => dragHandler(event)}
          >
            <img src={uploadedImg as string} alt="uploaded img by user" />
            <div className={classes.imgPlaceHolder}>
              <div className={classes.uploadInfo}>
                Drag and drop an image here or click to upload
              </div>
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            name="file"
            onChange={(event) => fileSelectedHandler(event)}
          />
        </label>
      </div>
    </section>
  );
};
