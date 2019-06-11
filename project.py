# This file is for cleaning and converting .csv files to .json for use in D3 .js files
# Name: Thomas Verouden
# Student number: 10779272
# python -m http.server 8888 &
# http://localhost:8888/project.html


import pandas as pd
import numpy as np
import json



def clean_bee(dataframe):
    """This cleans unnecessary, empty and invalid values of the given dataset"""

    # remove spaces from before and after column names
    dataframe.columns = dataframe.columns.str.lstrip()
    dataframe.columns = dataframe.columns.str.rstrip()

    loss = "Total Annual Loss"

    # select needed columns
    dataframe = dataframe[["Year", "State", loss]]


    # remove the states without any data (Alaska & Puerto Rico)
    dataframe = dataframe[dataframe.State != "Alaska"]

    dataframe = dataframe[dataframe.State != "Puerto Rico"]

    # set year 2010/11 to 2010, etc.
    dataframe["Year"] = dataframe["Year"].str.replace("/11", "")
    dataframe["Year"] = dataframe["Year"].str.replace("/12", "")
    dataframe["Year"] = dataframe["Year"].str.replace("/13", "")
    dataframe["Year"] = dataframe["Year"].str.replace("/14", "")
    dataframe["Year"] = dataframe["Year"].str.replace("/15", "")
    dataframe["Year"] = dataframe["Year"].str.replace("/16", "")
    dataframe["Year"] = dataframe["Year"].str.replace("/17", "")


    # set total annual loss to numeric
    dataframe[loss] = pd.to_numeric(dataframe[loss])

    # for i in dataframe[loss]:
    #     # print(i)
    #     if i.isnan():
    #         print("nan gevonden")


    return dataframe



def clean_crop(dataframe):
    """This cleans unnecessary, empty and invalid values of the given dataset"""

    # use relevant columns only
    dataframe = dataframe[["Year", "State", "Data Item", "Value"]]

    # remove , from value numbers
    dataframe["Value"] = dataframe["Value"].str.replace(",", "")

    # remove unnecessary years for the linechart from the dataset
    dataframe = dataframe[dataframe.Year != "2007"]
    dataframe = dataframe[dataframe.Year != "2008"]
    dataframe = dataframe[dataframe.Year != "2009"]
    dataframe = dataframe[dataframe.Year != "2017"]


    return dataframe



def interpolate(dataframe):
    """This is a script for interolating missing data of the USDA quickstats datasets"""
    for i in dataframe:
        print(i)




def convert2json(bee, apple):
    """This converts the given dataframe to a .json file"""

    beeJson = bee.to_json("bee_loss.json", orient="records")

    appleJson = apple.to_json("apple_yield_data", orient="records")








if __name__ == "__main__":

    # read data into pandas df
    bee_df = pd.read_csv("Datasets/bee_colony_loss.csv", delimiter=";")

    apple_df = pd.read_csv("Datasets/apple_yield_data", delimiter=";")





    # clean and convert the data
    bee_df = clean_bee(bee_df)

    apple_df = clean_crop(apple_df)









    convert2json(bijen_df, apple_df)








    # appel_df = clean_crop(appel_df)


    # convert2json(appel_df)
