import baseUrl from '../../helpers/baseUrl';
import React from 'react';
import styled from 'styled-components/native';
import RenderHtml from 'react-native-render-html';
import {DARK_GREY, THEME_GREEN} from '../../components/Utilities/Constants';
import {useWindowDimensions} from 'react-native';

export default function ArticleViewScreen({route}) {
  const {selectedArticle} = route.params;
  const {
    image,
    category,
    title,
    subTitle,
    readTime,
    description,
  } = selectedArticle;

  const {height, width} = useWindowDimensions();
  const Container = styled.ScrollView`
    flex: 1;
    max-width: ${width};
    background-color: white;
  `;

  const Hero = styled.View`
    position: relative;
    justify-content: center;
    display: flex;
    align-items: center;
  `;

  const StyledImage = styled.Image`
    max-width: ${width};
    max-height: ${height * 0.6};
    width: ${width};
    height: ${height * 0.33};
    margin-bottom: 10px;
  `;

  const ArticleContainer = styled.View`
    max-width: ${width};
    background-color: white;
    padding: 20px;
    flex: 1;
    position: relative;
    justify-content: flex-start;
  `;

  const Category = styled.Text`
    text-align: left;
    font-weight: 600;
    line-height: 16px;
    font-size: 14px;
    flex-wrap: wrap;
    color: ${THEME_GREEN};
  `;

  const Title = styled.Text`
    font-size: 20px;
    font-weight: 700;
    text-align: left;
    line-height: 20px;
    margin-top: 5px;
  `;

  const SubTitle = styled.Text`
    text-align: left;
    color: ${DARK_GREY};
    font-size: 14px;
    flex-wrap: wrap;
    margin-top: 5px;
  `;

  const ReadTime = styled.Text`
    text-align: left;
    color: ${DARK_GREY};
    font-size: 12px;
    margin-top: 5px;
  `;

  const descStyle = {
    textAlign: 'left',
    fontSize: 16,
    marginTop: 15,
    lineHeight: 20,
  };

  const renderImageLocation = `${baseUrl}${image}`;

  return (
    <Container>
      <Hero>
        <StyledImage source={{uri: renderImageLocation}} />
      </Hero>
      <ArticleContainer>
        <Category>{category}</Category>
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
        <ReadTime>{readTime} min read</ReadTime>
        <RenderHtml
          baseStyle={descStyle}
          source={{html: description}}
          contentWidth={271}
        />
      </ArticleContainer>
    </Container>
  );
}
