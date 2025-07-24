import { Form, useNavigation } from 'react-router-dom';
import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { FaXmark } from 'react-icons/fa6';
import placeholderImage from '../assets/images/placeholder-image.jpg';
import { queryClient } from '../utils/queryClient';
import { profileQuery } from '../api/queries';
import { useQuery } from '@tanstack/react-query';
const ImageWrapper = styled.div`
  position: relative;
  width: fit-content;
  margin: 40px 0;
  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 100%;
  }
  button {
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    cursor: pointer;
    position: absolute;
    top: -10px;
    right: -10px;
  }
  .img-wrapper {
    display: flex;
    flex-direction: column;
    /* justify-content: center;
    align-items: center; */
    gap: 8px;
    p {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 600px) {
    img {
      width: 100px;
      height: 100px;
    }
    .img-wrapper {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
    .img-wrapper p {
      font-size: 12px;
    }
  }
`;
export const ProfileLoader = async () => {
  try {
    const data = await queryClient.ensureQueryData(profileQuery);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
      return error;
    }
  }
};
const Profile = () => {
  const { state } = useNavigation();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { data } = useQuery(profileQuery);
  const [selectedImage, setSelectedImage] = useState<File | undefined>();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(undefined);
    if (imageRef.current && imageRef.current.value) {
      imageRef.current.value = '';
    }
  };

  return (
    <Wrapper>
      <h2> Your Profile</h2>
      {
        <ImageWrapper>
          {
            <div className='img-wrapper'>
              <img
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : data?.image
                    ? data.image
                    : placeholderImage
                }
                alt='Thumb'
              />{' '}
              <p>Maximum allowed size: 0.5MB</p>
            </div>
          }
          {selectedImage && (
            <button className='btn-outline' onClick={removeSelectedImage}>
              <FaXmark size={24} />
            </button>
          )}
        </ImageWrapper>
      }
      <Form
        method='POST'
        className='form-component'
        encType='multipart/form-data'
      >
        <FormRow
          label='Image'
          name='image'
          accept='image/*'
          type='file'
          ref={imageRef}
          id='file'
          onChange={handleImageChange}
        />
        <FormRow
          label='Name'
          defaultValue={data?.name}
          name='name'
          type='text'
          id='name'
          required
        />
        <FormRow
          defaultValue={data?.lastName}
          label='Last Name'
          name='lastName'
          type='text'
          id='lastName'
          required
        />
        <FormRow
          label='Email'
          defaultValue={data?.email}
          name='email'
          type='email'
          id='email'
          required
        />
        <FormRow
          defaultValue={data?.location}
          label='Location'
          name='location'
          type='text'
          id='location'
          required
        />

        <button
          disabled={state === 'submitting'}
          className='btn btn-block'
          type='submit'
        >
          {' '}
          {state === 'submitting' ? 'Editing...' : 'Edit'}
        </button>
      </Form>
    </Wrapper>
  );
};
export default Profile;
