import React, { useEffect, useState } from 'react'
import './Profile.scss'
import PageMenu from '../../components/Page Menu/PageMenu'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../components/Card/Card'
import { getUser, updateUserInfo, updateUserPhoto } from '../../redux/features/auth/authSlice'
import Loader from '../../components/Loader/Loader'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { shortenText } from '../../utils'

const cloud_name = import.meta.env.VITE_APP_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_APP_UPLOAD_PRESET;
const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`

const Profile = () => {
  const [formData, setFormData] = useState({})
  const { loading, user } = useSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  
    const dispatch = useDispatch();
    // console.log(user)
    // console.log(formData)
    useEffect(() => {
        if (user === null) {
            dispatch(getUser())
        }
        
    }, [dispatch, user])

    const handleChange = (e) => {
    const { id, value } = e.target;
    let updatedFormData;

    if (id.startsWith('address.')) {
        const field = id.split('.')[1];
        updatedFormData = {
        ...formData,
        address: {
            ...formData.address,
            [field]: value,
        },
        };
    } else {
        updatedFormData = {
        ...formData,
        [id]: value,
        };
    }

    setFormData(updatedFormData);
    };

    
    useEffect(() => {
    const inputFields = document.querySelectorAll('input');
    inputFields.forEach((input) => {
        input.addEventListener('input', handleChange);
    });

    return () => {
        inputFields.forEach((input) => {
        input.removeEventListener('input', handleChange);
        });
    };
    }, [formData]);


    
    const handleUpdateUserInfo = async (e) => {
        e.preventDefault();
        await dispatch(updateUserInfo(formData))
    }
    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    }

    const savePhoto = async (e) => {
        e.preventDefault();
        let imageUrl;

        try {
            if (
                profileImage && 
                (profileImage.type === 'image/jpeg' || profileImage.type === 'image/jpg' || profileImage.type === 'image/png')
            ) {
                const image = new FormData()
                image.append('file', profileImage )
                image.append('cloud_name', cloud_name )
                image.append('upload_preset', upload_preset,)
                
                const response = await fetch(url, {
                    method: 'post',
                    body: image
                })
                const imgData = await response.json()
                imageUrl = imgData.secure_url
            }
            const userData = {
                photo: profileImage ? imageUrl : user?.user?.photo
            }
            await dispatch(updateUserPhoto(userData))
            setImagePreview(null)
        } catch (error) {
            toast.error(error.message)
        }
    }
   
  return (
    <>
    <section>
        {loading && <Loader />}
    <div className='container'>
        <PageMenu />
        <h2>Profile</h2>
        <div className="--flex-start profile">
            <Card cardClass={'card'}>
               {!loading  && (
                <>
                <div className="profile-photo">
                    <div>
                        <img src={imagePreview === null ? user?.user?.photo 
                        : imagePreview} alt="photo" />
                        <h3>Role: {user?.user.role}</h3>
                        {imagePreview && (
                            <div className="--center-all">
                               <button className="--btn --btn-secondary" onClick={savePhoto}>
                                <AiOutlineCloudUpload size={18} /> Upload Photo
                            </button> 
                            </div>
                            
                        )}
                    </div>
                </div>
                <form onSubmit={handleUpdateUserInfo}>
                    <p>
                        <label>Change Photo:</label>
                        <input type="file" accept='image/*' onChange={handleImageChange}/>
                    </p>
                    <p>
                        <label>Name</label>
                        <input
                        type="text"
                        defaultValue={user?.user?.name}
                        id="name"
                        onChange={handleChange}
                        required
                        />
                    </p>
                    <p>
                        <label>Email</label>
                        <input
                        type="email"
                        defaultValue={user?.user?.email}
                        id="email"
                        onChange={handleChange}
                        disabled
                        />
                    </p>
                    <p>
                        <label>Phone</label>
                        <input
                        type="text"
                        defaultValue={user?.user?.phone}
                        id="phone"
                        onChange={handleChange}
                        required
                        />
                    </p>
                    <p>
                        <label>Address</label>
                        <input
                        type="text"
                        defaultValue={user?.user?.address?.address}
                        id="address.address"
                        onChange={handleChange}
                        required
                        />
                    </p>
                    <p>
                        <label>State</label>
                        <input
                        type="text"
                        defaultValue={user?.user?.address?.state}
                        id="address.state"
                        onChange={handleChange}
                        />
                    </p>
                    <p>
                        <label>Country</label>
                        <input
                        type="text"
                        defaultValue={user?.user?.address?.country}
                        id="address.country"
                        onChange={handleChange}
                        />
                    </p>
                    <button className="--btn --btn-primary --btn-block">
                        Update Profile
                    </button>
                </form>
                </>
               )} 
            </Card>
        </div>
    </div>
    </section>
    </>
  )
}

export const UserName = () => {
    const { user, loggedIn } = useSelector((state) => state.auth);
    
    const username = user?.user?.name || '...'

    return (
        <span style={{color: '#ff7722'}}>Hi, { shortenText(username, 15)  } | </span>
    )
}
export default Profile