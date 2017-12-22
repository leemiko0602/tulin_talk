import styled from 'styled-components/native';
import { colors } from '../../Data/constants';

const LoadingSpinner = styled.ActivityIndicator`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.background ? props.background : colors.primaryDark)};
  margin-top: ${props => props.top || 0};
`;

export default LoadingSpinner;
