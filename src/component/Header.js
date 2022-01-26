import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { userLogin } from '../redux/actions'

import imgLogo from '../asset/img/logo.png'
import Button from '../component/common/buttons'


const StyledMenuItem = styled.div`
display: none;

@media (min-width: 992px) {
  display: initial;
  font-size: 12px;
  margin-right: 2rem;
}
`
const StyledMenuItemIcon = styled.i`
margin-left: 0.5rem;
`
const MenuItem = ({ text }) => {
  return (
    <StyledMenuItem>
      {text}
      <StyledMenuItemIcon className="fas fa-angle-down" />
    </StyledMenuItem>
  )
}
MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
}

const menuList = ['Why ACY', 'Products', 'Platforms', 'Education', 'Partners']
const StyledHeader = styled.header`
padding: 0.5rem;
width: 100%;
position: fixed;
z-index: ${({ theme }) => theme.zIndex.top}; 
border-bottom: 1px solid ${({ theme }) => theme.subBorderColor};
font-size: 18px;

@media (min-width: 992px) {
  padding: 1.5rem;
  font-size: 27px;
}
`
const StyledHeaderContainer = styled.div`
display:flex;
align-items:center;
font-size: 18px;

@media (min-width: 992px) {
  width: 80%;
  margin: 0 auto;
}
`
const StyledMobilMenuIcon = styled.i`
&:hover {
  cursor: pointer;
}

@media (min-width: 992px) {
  display: none;
}
`
const StyledLogo = styled.img`
width: 68px;
margin: 0 1rem;

@media (min-width: 992px) {
  width: 136px;
}
`
const StyledHeaderLeftContainer = styled.div`
width: 100%;
display:flex;
align-items:center;
justify-content:space-between;
`
const StyledMenuContainer = styled.div`
margin-left: 2rem;
display:flex;
justify-content:space-between;
`
const Header = () => {
  const dispatch = useDispatch()

  const handleLoginClick = () => {
    dispatch(userLogin())
  }

  return (
    <StyledHeader>
      <StyledHeaderContainer>
        <StyledMobilMenuIcon className="fas fa-bars" />
        <StyledLogo src={imgLogo} />
        <StyledHeaderLeftContainer>
          <StyledMenuContainer>
            {menuList.map((item, index) => <MenuItem key={index} text={item} />)}
          </StyledMenuContainer>
          <Button text="Login" onClick={handleLoginClick} />
        </StyledHeaderLeftContainer>
      </StyledHeaderContainer>
    </StyledHeader>
  )
}

Header.propTypes = {}

export default Header