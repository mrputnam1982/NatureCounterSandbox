import React, { useState } from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import MainContainer from '../../components/Container/MainContainer';
import { CheckBoxRow } from '../../components/Card/CheckBoxRow';
import NotFound from '../../components/Utilities/NotFound';


export default function ArticleSubscribeScreen({ user, articles }) {
    //all of the articles as an object
    const { data } = articles;
    // //extracts all of the categories from the articles
    const categoryList = [...new Set(
        data.map(x => JSON.stringify((({ category }) => ({ category }))(x))))
    ].map(JSON.parse);

    // //makes a list of all of the categories
    let categoriesList = [];
    for (var i = 0; i < categoryList.length; i++) {
        categoriesList[i] = categoryList[i].category;
    }
    const renderCategories = () =>
    (
        categoriesList?.map((b) => (
            <View style={{ padding: 5 }}>
                <CheckBoxRow
                    category={b}
                    user={user}
                />
            </View>
        ))
    );

    return (
        <MainContainer>
            <View style={{ borderBottomColor: "gray", borderBottomWidth: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>{user.name}'s Subscriptions:</Text>
            </View>
            {
                categoriesList
                    ? renderCategories()
                    : <NotFound item="Categories" />
            }

        </MainContainer>
    );
}

