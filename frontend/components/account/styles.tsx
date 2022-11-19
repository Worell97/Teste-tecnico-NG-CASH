import styled from 'styled-components';
import Modal from 'styled-react-modal'

interface StyledModalProps {
    opacity: number;
};

export const StyledModal = Modal.styled`
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    background-color: #0d1117;
    width: 30%;
    padding: 1rem 2rem 2rem 2rem;
    max-width: 1120px;
    border-radius: 0.5rem;
    justify-content: center;
    align-items: center;
    opacity: ${(props: StyledModalProps) => props.opacity};
    transition : all 0.3s ease-in-out;
`;

export const ModalHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    width: 100%;
`;

export const Resume = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    width: 100%;    
    max-height: 20px;
    flex: 100%;                  
`;

export const AccountFrame = styled.div`
    margin-left: 3rem;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-content: space-between;
    width: 100%; 
    height: 100%;
`;