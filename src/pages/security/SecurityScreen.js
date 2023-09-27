
import React,{useState,useEffect,useCallback} from 'react'
import PageTitle from '../../components/Common/PageTitle'
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { useSelector, useDispatch } from "react-redux";
import {
    defaultTdStyle,
    defaultTdActionStyle,
    defaultTdWrapperStyle,
    defaultTdContent,
    defaultTdContentTitleStyle,
    defaultSearchStyle,
  } from "../../constants/defaultStyles";
  import { setEditedId,setDeleteId ,getAllAuthentication} from '../../store/authSlice';
const SecurityScreen = () => {
    const dispatch = useDispatch();
const [Page, setPage] = useState(true)

const fetched = async ()=>{
    const token = JSON.parse(localStorage.getItem("Token"))
    const response = await fetch(`${process.env.REACT_APP_PROXY}/security`,{
      method:'POST',
    
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify({token:token})
    })
    const json = await response.json()
    if (json.success) {
        setPage(false)
    }
}

useEffect(() => {
    fetched()
}, [])

const data = useSelector(getAllAuthentication);
const handleDelete = useCallback(
    (item) => {
      dispatch(setDeleteId(item._id));
    },
    [dispatch]
  );

  const handleEdit = useCallback(
    (item) => {
      dispatch(setEditedId(item._id));
    },
    [dispatch]
  );


  return (
   <>

      <div className="flex flex-col sm:flex-row flex-wrap p-4">
        <div className="sm:mr-4">
          <PageTitle title="Security Settings" />
        </div>
    </div>
   {Page && <h1 className='text-center text-2xl mt-4'> 404 Page Not Found</h1>}
   {!Page && <div className='mt-4 mx-10'>
   <div className="sm:bg-white rounded-xl sm:px-3 sm:py-3">
        <div className="hidden sm:flex invisible sm:visible w-full flex-col sm:flex-row">
        
          <div className="sm:text-left text-default-color font-title flex-1">
            User ID
          </div>
          <div className="sm:text-left text-default-color font-title flex-1">
            Type
          </div>
          <div className="sm:text-left text-default-color font-title flex-1">
            Password
          </div>
          <div className="sm:text-left text-default-color font-title sm:w-11">
            Action
          </div>
        </div>

       {data && data.map((auth) => (
              <div className={defaultTdWrapperStyle} key={auth._id}>
                <div className={defaultTdStyle}>
                  <div className={defaultTdContentTitleStyle}>authID</div>
                  <div className={defaultTdContent}>
                    {/* {auth.image ? (
                      <img
                        className="object-cover h-10 w-10 rounded-2xl"
                        src={auth.image}
                        alt={auth.name}
                      />
                    ) : (
                      <span className="h-10 w-10 rounded-2xl bg-gray-100 flex justify-center items-center">
                        <ProductIcon />
                      </span>
                    )} */}
                    <span className="whitespace-nowrap text-ellipsis overflow-hidden pl-1">
                      {auth.ID || "#"}
                    </span>
                  </div>
                </div>

                <div className={defaultTdStyle}>
                  <div className={defaultTdContentTitleStyle}>Name</div>
                  <div className={defaultTdContent}>
                    <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                      {auth.type}
                    </span>
                  </div>
                </div>

                <div className={defaultTdStyle}>
                  <div className={defaultTdContentTitleStyle}>Amount</div>
                  <div className={defaultTdContent}>
                    <input disabled value={auth.password} type="password" className="whitespace-nowrap bg-white text-ellipsis overflow-hidden">
                    
                    </input>
                  </div>
                </div>

          

                <div className={defaultTdActionStyle}>
                  <div className={defaultTdContentTitleStyle}>Action</div>
                  <div className={defaultTdContent}>
                    <Menu
                      menuButton={
                        <MenuButton>
                          <div className="bg-gray-50 px-2 rounded-xl">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-blue-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                              />
                            </svg>
                          </div>
                        </MenuButton>
                      }
                      transition
                    >
                      <MenuItem onClick={() => handleEdit(auth)}>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(auth)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>
            ))}
    
        </div>
        </div>}
    </>
  )
}

export default SecurityScreen