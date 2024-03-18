import { useState, useEffect } from 'react';

import { UnUploadedImg } from '@widgets/unUploadedImage';
import { UploadedImage } from '@widgets/uploadedImage';
import { Palette } from '@widgets/imagePalette';
import Loading from '@shared/ui/Loading/Loading';

import { DragEv, ChangeEv } from '../types/dragParams';

import classes from './imagePalette.module.css';

type ImgColArr = { [key: string]: number };
export const ImagePalette = () => {
  const [drag, setDrag] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageColours, setImageColours] = useState<Uint8ClampedArray>();
  const [rgbList, setRgbList] = useState<ImgColArr[]>([]);
  const [uploadedImg, setUploadedImg] = useState<string | ArrayBuffer>('');

  const dragStartHandler = (event: DragEv) => {
    event.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (event: DragEv) => {
    event.preventDefault();
    setDrag(false);
  };

  const dragHandler = (event: DragEv) => {
    dragLeaveHandler(event);
    canvasImage(event.dataTransfer.files);
  };

  const fileSelectedHandler = (event: ChangeEv) => {
    event.preventDefault();
    const file = event.target.files as FileList;
    canvasImage(file);
  };

  const canvasImage = (file: FileList) => {
    setLoading(true);
    const img = new Image();
    const fileReader = new FileReader();

    fileReader.onload = () => {
      img.onload = () => {
        //creating canvas base on image size
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        //draw the image we got
        const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setImageColours(data);
      };
      const res = fileReader.result;
      if (!res) return;
      img.src = res as string;
      setUploadedImg(res);
    };

    fileReader.readAsDataURL(file[0]);
  };

  const gettingArrayOfCOlours = () => {
    if (imageColours?.length === 0 || imageColours === undefined) return;
    const arr = [];
    for (let i = 0; i < imageColours.length; i += 4) {
      arr.push({
        r: imageColours[i],
        g: imageColours[i + 1],
        b: imageColours[i + 2],
      });
    }
    setRgbList(arr);
  };

  const dragParams = {
    uploadedImg,
    drag,
    dragStartHandler,
    dragLeaveHandler,
    dragHandler,
    fileSelectedHandler,
  };

  useEffect(() => {
    gettingArrayOfCOlours();
    setLoading(false);
  }, [imageColours]);

  return (
    <div className={classes.wrapper}>
      {uploadedImg ? (
        <UploadedImage {...dragParams} />
      ) : (
        <UnUploadedImg {...dragParams} />
      )}
      {loading ? <Loading /> : <Palette {...{ rgbList }} />}
    </div>
  );
};
