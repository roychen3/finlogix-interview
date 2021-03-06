import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { StyledFontAwesomeIconButton } from './Button'


const StyledSideMenuItem = styled.div`
padding: ${({ subMenuListIsOpen, level }) => (level === 0 && subMenuListIsOpen) ? '0.5rem 1rem 0.5rem 0.5rem' : '0.5rem 1rem'};
border-bottom: 1px solid ${({ theme }) => theme.borderColor};
border-left: ${({ theme, subMenuListIsOpen, level }) => (level === 0 && subMenuListIsOpen) ? `0.5rem solid ${theme.hoverHighlight}` : `0px`};
display: flex;
justify-content: space-between;
align-items: center;
background-color: ${({ theme, level }) => level % 2 === 0 ? theme.mainBackground : theme.subBackground};
`
const StyledSideMenuLink = styled.a`
margin-left: ${({ level }) => level * 0.5}rem;
padding: 6px 0 6px;

&:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.hoverHighlight};
    padding-bottom: 3px;
    border-bottom: 3px solid ${({ theme }) => theme.hoverHighlight};
}
`
const StyledSideMenuIcon = styled.i`
font-size: 30px;
transform: rotate(${({ subMenuListIsOpen }) => subMenuListIsOpen ? '-90deg' : '0deg'});
transition: transform 0.3s linear;

&:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.hoverHighlight};
}
`
const StyledSideMenuList = styled.div`
overflow: hidden;
height: ${({ isOpenTransitionend, sideMenuListHeight }) => isOpenTransitionend ? 'initial' : `${sideMenuListHeight}px`};
transition: height 0.3s linear;
`
const SideMenuItem = ({ text, list, level }) => {
    const menuItemRef = useRef()
    const menuListRef = useRef()

    const [isDidMount, setIsDidMount] = useState(false)
    const [subMenuListIsOpen, setSubMenuListIsOpen] = useState(false)
    const [sideMenuListHeight, setSideMenuListHeight] = useState(0)

    const [isTransitionrun, setIsTransitionrun] = useState(true)
    const [isOpenTransitionend, setIsOpenTransitionend] = useState(false)
    const transitionListener = (event) => {
        switch (event.type) {
            case 'transitionstart':
                setIsTransitionrun(true)
                break
            case 'transitionrun':
                setIsTransitionrun(true)
                break
            case 'transitionend':
                setIsTransitionrun(false)
                break
        }
    }
    useEffect(() => {
        if (isDidMount) {
            if (isTransitionrun === false) {
                if (subMenuListIsOpen) {
                    setIsOpenTransitionend(true)
                } else {
                    setIsOpenTransitionend(false)
                }
            }
        }
    }, [isTransitionrun])

    useEffect(() => {
        menuListRef.current.addEventListener('transitionstart', transitionListener, false)
        menuListRef.current.addEventListener('transitionrun', transitionListener, false)
        menuListRef.current.addEventListener('transitionend', transitionListener, false)
        setIsDidMount(true)
    }, [])

    useEffect(() => {
        if (isDidMount) {
            if (subMenuListIsOpen) {
                let allChildListHeught = 0
                menuListRef.current.childNodes.forEach((element) => {
                    const isMatch = element.className.match('menu show')
                    if (isMatch) allChildListHeught += element.offsetHeight
                })
                setSideMenuListHeight(menuItemRef.current.offsetHeight * list.length + allChildListHeught)
            } else {
                setSideMenuListHeight(0)
            }
        }
    }, [subMenuListIsOpen])

    return (
        <>
            <StyledSideMenuItem subMenuListIsOpen={subMenuListIsOpen} level={level} ref={menuItemRef}>
                <StyledSideMenuLink level={level}>{text}</StyledSideMenuLink>
                {list.length > 0 &&
                    <StyledFontAwesomeIconButton
                        onClick={() => {
                            setSideMenuListHeight(menuListRef.current.offsetHeight)
                            setIsOpenTransitionend(false)
                            setSubMenuListIsOpen(preValue => !preValue)
                        }}
                    >
                        <StyledSideMenuIcon
                            className="fas fa-angle-left"
                            subMenuListIsOpen={subMenuListIsOpen}
                        />
                    </StyledFontAwesomeIconButton>
                }
            </StyledSideMenuItem>

            <StyledSideMenuList
                className={subMenuListIsOpen ? 'menu show' : 'menu close'}
                isOpenTransitionend={isOpenTransitionend}
                sideMenuListHeight={sideMenuListHeight}
                ref={menuListRef}
            >
                {list.map((item, index) => (
                    <SideMenuItem
                        key={index}
                        text={item.text}
                        list={item.list}
                        level={level + 1}
                    />
                ))}
            </StyledSideMenuList>

        </>
    )
}
SideMenuItem.defaultProps = {
    level: 0,
}
SideMenuItem.propTypes = {
    text: PropTypes.string.isRequired,
    level: PropTypes.number,
}


const StyledSideMenuListContainer = styled.div`
position: fixed;
top: 0;
left: 0;
z-index: ${({ theme }) => theme.zIndex.top};
transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(-100%)'};
transition: transform 0.3s linear;
min-height: 100vh;
max-height: 100vh;
background-color: ${({ theme }) => theme.mainBackground};
box-shadow: 1px 2px 6px rgba(219, 219, 219, 0.5);
overflow-x: hidden;
overflow-y: auto;
overscroll-behavior: none;
width: 100%;

@media (min-width: ${({ theme }) => theme.media.smallDevices}) {
    width: 300px;
}

@media (min-width: ${({ theme }) => theme.media.largeDevices}) {
    display: none;
}
`
const StyledSideMenuClose = styled.div`
padding: 0.5rem 1rem;
border-bottom: 1px solid ${({ theme }) => theme.borderColor};
background-color: ${({ theme }) => theme.mainBackground};
text-align: right;
`
const StyledSideMenuCloseIcon = styled.i`
font-size: 30px;
`
const StyledSideMenuShadow = styled.div`
width: 100%;
min-height: 100vh;
max-height: 100vh;
position: fixed;
top: 0;
left: 0;
z-index: ${({ theme }) => theme.zIndex.sideNavigation};
visibility: ${({ isOpen }) => isOpen ? 'visible' : 'hidden'};
background-color: ${({ theme }) => theme.shadow};
opacity: ${({ isOpen }) => isOpen ? '1' : '0'};
transition: visibility 0.3s linear, opacity 0.3s linear;

@media (min-width: ${({ theme }) => theme.media.largeDevices}) {
    display: none;
}
`
export const SideMenu = ({ isOpen, onClose, list }) => {
    const menuShadowRef = useRef()
    useEffect(() => {
        menuShadowRef.current.addEventListener('click', onClose)
    }, [])


    useEffect(() => {
        const bodyElement = document.querySelector('body')
        if (isOpen) {
            bodyElement.style.overflow = 'hidden'
        } else {
            bodyElement.style.overflow = 'auto'
        }

        return () => {
            bodyElement.style.overflow = 'auto'
        }
    }, [isOpen])


    return (
        <>
            <StyledSideMenuListContainer isOpen={isOpen}>
                <StyledSideMenuClose>
                    <StyledFontAwesomeIconButton onClick={onClose}>
                        <StyledSideMenuCloseIcon className="fas fa-times" />
                    </StyledFontAwesomeIconButton>
                </StyledSideMenuClose>
                {list.map((item, index) => (
                    <SideMenuItem
                        key={index}
                        text={item.text}
                        list={item.list}
                    />
                ))}
            </StyledSideMenuListContainer>
            <StyledSideMenuShadow ref={menuShadowRef} isOpen={isOpen} />
        </>
    )
}
SideMenu.defaultProps = {
    list: [],
}
SideMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    list: PropTypes.arrayOf(Object),
}


// === largeDevices Menu ===

const StyledSubMenuItem = styled.a`
margin-right: 2rem;
padding: 6px 0 6px;

&:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.hoverHighlight};
    padding-bottom: 3px;
    border-bottom: 3px solid ${({ theme }) => theme.hoverHighlight};
}
`
const SubMenuItem = ({ text }) => {
    return (
        <StyledSubMenuItem>
            {text}
        </StyledSubMenuItem>
    )
}
SubMenuItem.propTypes = {
    text: PropTypes.string.isRequired,
}


const StyledSubMenuList = styled.div`
position: absolute;
top: calc(100% - 1rem);
left: 0;
width: 100%;
padding: 2rem;
background-color: ${({ theme }) => theme.mainBackground};
box-shadow: 1px 2px 6px rgba(219, 219, 219, 0.5);
display: none;
`
const SubMenuList = ({ list }) => {
    return (
        <StyledSubMenuList>
            {list.map((item, index) => <SubMenuItem key={index} text={item.text} />)}
        </StyledSubMenuList>
    )
}
SubMenuList.defaultProps = {
    list: [],
}
SubMenuList.propTypes = {
    list: PropTypes.arrayOf(Object),
}


const StyledMainMenuText = styled.a`
padding: 6px 0 6px;
display: flex;
align-items: center;

&:hover {
    cursor: pointer;
}
`
const StyledMainMenuIcon = styled.i`
margin-left: 0.5rem;
`
const MainMenuText = ({ text }) => {
    return (
        <StyledMainMenuText>
            {text}
            <StyledMainMenuIcon className="fas fa-angle-down" />
        </StyledMainMenuText>
    )
}
MainMenuText.propTypes = {
    text: PropTypes.string.isRequired,
}


const StyledMainMenuList = styled.div`
display: none;
position: relative;

@media (min-width: ${({ theme }) => theme.media.largeDevices}) {
  display: flex;
}
`
const StyledMainMenuItem = styled.div`
font-size: 12px;
margin-right: 2rem;
padding: 1rem 0;

&:hover {
    & > a {
        color: ${({ theme }) => theme.hoverHighlight};
        padding-bottom: 3px;
        border-bottom: 3px solid ${({ theme }) => theme.hoverHighlight};
    }

    & div {
        display: initial;
    }
}
`
const MainMenuList = ({ list }) => {
    return (
        <StyledMainMenuList>
            {list.map((item, index) => (
                <StyledMainMenuItem key={index}>
                    <MainMenuText text={item.text} />
                    <SubMenuList list={item.list} />
                </StyledMainMenuItem>
            ))}
        </StyledMainMenuList>
    )
}
MainMenuList.defaultProps = {
    list: [],
}
MainMenuList.propTypes = {
    list: PropTypes.arrayOf(Object),
}

export default MainMenuList
