import { dragProps } from '@pages/imagePalette/types/dragParams';
import { Preview } from '../assets/Preview';

import classes from './unUploaded.module.css';

export const UnUploadedImg = (params: dragProps) => {
  const {
    drag,
    dragStartHandler,
    dragLeaveHandler,
    dragHandler,
    fileSelectedHandler,
  } = params;
  return (
    <section className={classes.wrapper}>
      <div className={classes.Info}>
        <h1 className={classes.title}>Create a palette based on the image</h1>
        <div className={classes.textInfo}>
          Define colours in any photo. Just drag an image or upload it.
        </div>
      </div>
      <div className={classes.UploadWrapper}>
        <div
          className={classes[drag ? 'containerHover' : 'container']}
          onDragStart={dragStartHandler}
          onDragOver={dragStartHandler}
          onDragLeave={dragLeaveHandler}
          onDrop={(event) => dragHandler(event)}
        >
          <div className={classes.imageHolder}>
            <Preview />
          </div>
          <div className={classes.uploadInfo}>
            {!drag
              ? `Drag and drop an image here or choose upload image`
              : `Drop it here`}
          </div>
          <div className={classes.uploadImageBtn}>
            <label>
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={(event) => fileSelectedHandler(event)}
              />
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};
