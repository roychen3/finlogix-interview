import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { getPostList } from '../../../redux/actions'
import LoadingShadow from '../../../component/LoadingShadow'
import { StyledButton } from '../../../component/Button'
import WebinarCard from './WebinarCard'


const WebinarButton = styled(StyledButton)`
width: 50px;
padding: 1rem;
border-radius: 50%;
position: absolute;
top: 50%;
transform: translateY(-50%);
color: ${({ theme }) => theme.mainBackground};
background-color: ${({ theme }) => theme.shadow};
opacity: 0.7;

&:hover {
    opacity: 1;
}
`
const WebinarLeftButton = styled(WebinarButton)`
left: 1rem
`
const WebinarRightButton = styled(WebinarButton)`
right: 1rem
`

const StyledWebinarListContainer = styled.div`
background-color: ${({ theme }) => theme.subBackground};
position: relative;
`
const StyledList = styled.div`
width: 90%;
margin: 0 auto;
padding: 40px 0px;
display: grid;
grid-template-columns: 100%;
grid-gap: 12px;

@media (min-width: ${({ theme }) => theme.media.smallDevices}) {
    padding: 40px 0;
    grid-template-columns: auto auto;
    grid-gap: 20px;
}

@media (min-width: ${({ theme }) => theme.media.largeDevices}) {
    width: 80%;
    padding: 80px 0;
    grid-template-columns: auto auto auto;
}
`

const StyledErrorMessageContainer = styled.div`
color: ${({ theme }) => theme.error};
padding: 5rem;
display: flex;
justify-content: center;
align-items: center;
`
const StyledReloadButton = styled.button`
font-size: 1.5rem;
color: ${({ theme }) => theme.error};
background-color: ${({ theme }) => theme.opacity};
border: 0px;
margin-right: 1rem;
`

const WebinarList = () => {
    const dispatch = useDispatch()

    const getPostListFirstPage = () => {
        dispatch(getPostList(
            {
                perPage: 12,
                page: 1,
            }
        ))
    }

    useEffect(() => {
        getPostListFirstPage()
    }, [])

    const [currentGroupID, setCurrentGroupID] = useState(0)

    const postList = useSelector((state) => state.home.postList)
    const postListPagination = useSelector((state) => state.home.postListPagination)
    const postListLoading = useSelector((state) => state.home.postListLoading)
    const postListError = useSelector((state) => state.home.postListError)

    const handleLeftClick = (event) => {
        event.preventDefault()
        if (currentGroupID === 0) {
            const prePage = postListPagination.current_page - 1
            dispatch(getPostList({
                perPage: 12,
                page: prePage,
            }))
            setCurrentGroupID(1)
        } else {
            setCurrentGroupID(preValue => preValue - 1)
        }
    }
    const handleRightClick = (event) => {
        event.preventDefault()
        if (currentGroupID + 1 === postList.length) {
            const nextPage = postListPagination.current_page + 1
            dispatch(getPostList({
                perPage: 12,
                page: nextPage,
            }))
            setCurrentGroupID(0)
        } else {
            setCurrentGroupID(preValue => preValue + 1)
        }
    }

    return (
        <StyledWebinarListContainer>
            {postListLoading &&
                <LoadingShadow />
            }
            {postListError &&
                <StyledErrorMessageContainer>
                    <StyledReloadButton onClick={getPostListFirstPage}>
                        <i className="fas fa-redo-alt" />
                    </StyledReloadButton>
                    <h1>
                        {postListError}
                    </h1>
                </StyledErrorMessageContainer>
            }
            {postListLoading === false && postListError === null &&
                <>
                    {(currentGroupID !== 0 || postListPagination.current_page !== 1) &&
                        <WebinarLeftButton onClick={handleLeftClick}>
                            <i className="fas fa-chevron-left" />
                        </WebinarLeftButton>
                    }
                    {(currentGroupID + 1 !== postList.length || postListPagination.current_page !== postListPagination.total_pages) &&
                        <WebinarRightButton onClick={handleRightClick}>
                            <i className="fas fa-chevron-right" />
                        </WebinarRightButton>
                    }
                    {postList.length > 0 &&
                        <StyledList>
                            {postList[currentGroupID].group.map((item) => (
                                <WebinarCard key={item.id} data={item} />
                            ))}
                        </StyledList>
                    }
                </>
            }
        </StyledWebinarListContainer>
    )
}

WebinarList.propTypes = {}

export default WebinarList