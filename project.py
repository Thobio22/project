# This file is for cleaning and converting .csv files to .json for use in D3 .js files
# Name: Thomas Verouden
# Student number: 10779272
# python -m http.server 8888 &
# http://localhost:8888/project.html


import pandas as pd
import numpy as np
import json
from pprint import pprint



def clean_bee(dataframe):
    """This cleans unnecessary, empty and invalid values of the given dataset"""

    # remove spaces from before and after column names
    dataframe.columns = dataframe.columns.str.strip()
    dataframe.columns = dataframe.columns.str.replace(" ", "_")

    loss = "Total_Annual_Loss"


    # drop unneeded columns
    dataframe = dataframe[["State", loss]]


    # remove the states without any data (Alaska & Puerto Rico)
    dataframe = dataframe.drop(index="AK", level=1)

    dataframe = dataframe.drop(index="PR", level=1)


    # set values to numeric
    dataframe[loss] = round(pd.to_numeric(dataframe[loss]), 3)

    # set loss to %
    dataframe[loss] = dataframe[loss]*100

    return dataframe



def clean_bee_line(dataframe):
    """This cleans unnecessary, empty and invalid values of the given dataset"""

    # remove spaces from before and after column names
    dataframe.columns = dataframe.columns.str.strip()
    dataframe.columns = dataframe.columns.str.replace(" ", "_")

    loss = "Total_Annual_Loss"

    dataframe = dataframe[["Year", "State", "State_ISO", loss]]

    # set values to numeric
    dataframe[loss] = round(pd.to_numeric(dataframe[loss]), 3)

    return dataframe



def clean_crop(dataframe):
    """
    This cleans unnecessary, empty and invalid values of the given dataset,
    and converts values to needed formats
    """

    # remove spaces from before and after column names
    dataframe.columns = dataframe.columns.str.strip()

    dataframe.columns = dataframe.columns.str.replace(" ", "_")


    # use relevant columns only
    value = "Value_in_Kg_per_Acre"

    dataframe = dataframe[["Year", "State_ISO", "State", value]]


    # set all different weight values to kg / acre, coerce errors to get NaN values on invalids
    dataframe[value] = pd.to_numeric(dataframe[value], errors="coerce")

    # drop rows with NaN
    dataframe = dataframe.dropna()

    return dataframe



def clean_cause(dataframe):
    """Cleans dataframe of empty/unnecessary values"""

    # remove spaces from before and after column names
    dataframe.columns = dataframe.columns.str.strip()

    dataframe.columns = dataframe.columns.str.replace(" ", "_")


    # set all percentages to numeric, coerce errors (NaN) to be actual NaN values
    dataframe["Varroa_mites"] = pd.to_numeric(dataframe["Varroa_mites"], errors="coerce")
    dataframe["Other_pests_and_parasites"] = pd.to_numeric(dataframe["Other_pests_and_parasites"], errors="coerce")
    dataframe["Diseases"] = pd.to_numeric(dataframe["Diseases"], errors="coerce")
    dataframe["Pesticides"] = pd.to_numeric(dataframe["Pesticides"], errors="coerce")
    dataframe["Other"] = pd.to_numeric(dataframe["Other"], errors="coerce")
    dataframe["Unknown"] = pd.to_numeric(dataframe["Unknown"], errors="coerce")

    return dataframe



def combine_crop(apple_df, pear_df, blueberry_df, cherry_df, peach_df, strawberry_df):
    """Combines the crop data into 1 dataframe"""
    lineData = {'AL': [], 'AK': [], 'AZ': [], 'AR': [], 'CA': [], 'CO': [], 'CT': [], \
                'DE': [], 'FL': [], 'GA': [], 'HI': [], 'ID': [], 'IL': [], 'IN': [], \
                'IA': [], 'KS': [], 'KY': [], 'LA': [], 'ME': [], 'MD': [], 'MA': [], \
                'MI': [], 'MN': [], 'MS': [], 'MO': [], 'MT': [], 'NE': [], 'NV': [], \
                'NH': [], 'NJ': [], 'NM': [], 'NY': [], 'NC': [], 'ND': [], 'OH': [], \
                'OK': [], 'OR': [], 'PA': [], 'RI': [], 'SC': [], 'SD': [], 'TN': [], \
                'TX': [], 'UT': [], 'VT': [], 'VA': [], 'WA': [], 'WV': [], 'WI': [], 'WY': []}


    df_list = [pear_df, blueberry_df, cherry_df, peach_df, strawberry_df]


    # maak lijst aan met opgetelde waardes die in lineData moeten
    for index, iso in enumerate(apple_df["State_ISO"]):
        if iso in lineData.keys():
            lineData[iso].append({"Year": apple_df["Year"][index], "Kg_per_Acre": apple_df["Value_in_Kg_per_Acre"][index]})\


    # for df_name in df_list:
    #     print(df_name)
    # for index, iso in enumerate(df_name["State_ISO"]):
    #     for year in df_name["Year"]:
    #         print(year)
    #
    #         print(lineData[iso])
    #
    #         print(lineData[iso].Year)
    #         # als staat + jaar al in lineData
    #         if year in lineData[iso].Year:
    #             lineData[iso].Kg_per_Acre = lineData[iso].Kg_per_Acre + df_name["Value_in_Kg_per_Acre"][index]
    #         # als staat + jaar nog niet in lineData, voeg dan toe
    #         elif iso in lineData.keys():
    #             lineData[iso].append({"Year": df_name["Year"][index], "Kg_per_Acre": df_name["Value_in_Kg_per_Acre"][index]})

    for index, iso in enumerate(pear_df["State_ISO"]):
        for year in pear_df["Year"]:
            for j in lineData[iso]:
                print(j)

                # als staat + jaar al in lineData
                if year in lineData[iso][j].keys():
                    print("dit werkt")
                #     lineData[iso]["Kg_per_Acre"] = lineData[iso]["Kg_per_Acre"] + pear_df["Value_in_Kg_per_Acre"][index]
                # # als staat + jaar nog niet in lineData, voeg dan toe
                # elif iso in lineData.keys():
                #     lineData[iso].append({"Year": pear_df["Year"][index], "Kg_per_Acre": pear_df["Value_in_Kg_per_Acre"][index]})


    # for index, iso in enumerate(blueberry_df["State_ISO"]):
    #     for year in blueberry_df["Year"]:
    #         # als staat + jaar al in lineData
    #         if year in lineData[iso].Year:
    #             lineData[iso].Kg_per_Acre = lineData[iso].Kg_per_Acre + blueberry_df["Value_in_Kg_per_Acre"][index]
    #         # als staat + jaar nog niet in lineData, voeg dan toe
    #         elif iso in lineData.keys():
    #             lineData[iso].append({"Year": blueberry_df["Year"][index], "Kg_per_Acre": blueberry_df["Value_in_Kg_per_Acre"][index]})
    #
    #
    # for index, iso in enumerate(cherry_df["State_ISO"]):
    #     for year in cherry_df["Year"]:
    #         # als staat + jaar al in lineData
    #         if year in lineData[iso].Year:
    #             lineData[iso].Kg_per_Acre = lineData[iso].Kg_per_Acre + cherry_df["Value_in_Kg_per_Acre"][index]
    #         # als staat + jaar nog niet in lineData, voeg dan toe
    #         elif iso in lineData.keys():
    #             lineData[iso].append({"Year": cherry_df["Year"][index], "Kg_per_Acre": cherry_df["Value_in_Kg_per_Acre"][index]})
    #
    #
    # for index, iso in enumerate(peach_df["State_ISO"]):
    #     for year in peach_df["Year"]:
    #         # als staat + jaar al in lineData
    #         if year in lineData[iso].Year:
    #             lineData[iso].Kg_per_Acre = lineData[iso].Kg_per_Acre + peach_df["Value_in_Kg_per_Acre"][index]
    #         # als staat + jaar nog niet in lineData, voeg dan toe
    #         elif iso in lineData.keys():
    #             lineData[iso].append({"Year": peach_df["Year"][index], "Kg_per_Acre": peach_df["Value_in_Kg_per_Acre"][index]})
    #
    #
    # for index, iso in enumerate(strawberry_df["State_ISO"]):
    #     for year in strawberry_df["Year"]:
    #         # als staat + jaar al in lineData
    #         if year in lineData[iso].Year:
    #             lineData[iso].Kg_per_Acre = lineData[iso].Kg_per_Acre + strawberry_df["Value_in_Kg_per_Acre"][index]
    #         # als staat + jaar nog niet in lineData, voeg dan toe
    #         elif iso in lineData.keys():
    #             lineData[iso].append({"Year": strawberry_df["Year"][index], "Kg_per_Acre": strawberry_df["Value_in_Kg_per_Acre"][index]})


    return lineData



def dump_in_json(dataframe, name):
    """Converts dataframe to nested dictionary and dumps it in a json file"""

    nested_dict = dataframe.groupby(level=0).apply(lambda dataframe: dataframe.xs(dataframe.name).to_dict(orient="index")).to_dict()

    with open (name + ".json", "w") as infile:
        json.dump(nested_dict, infile)



if __name__ == "__main__":

    # read data into pandas df

    bee_df = pd.read_csv("Datasets/bee_colony_loss.csv", delimiter=";", index_col = ["Year", "State ISO"])

    bee_line_df = pd.read_csv("Datasets/bee_colony_loss.csv", delimiter=";")

    apple_df = pd.read_csv("Datasets/apple_yield.csv", delimiter=";")

    pear_df = pd.read_csv("Datasets/pear_yield.csv", delimiter=";")

    blueberry_df = pd.read_csv("Datasets/blueberry_yield.csv", delimiter=";")

    cherry_df = pd.read_csv("Datasets/cherry_yield.csv", delimiter=";")

    peach_df = pd.read_csv("Datasets/peach_yield.csv", delimiter=";")

    strawberry_df = pd.read_csv("Datasets/strawberry_yield.csv", delimiter=";")

    cause_df = pd.read_csv("Datasets/causation_average_data.csv", delimiter=";")


    # clean the data
    bee_df = clean_bee(bee_df)

    # bee_line_df = clean_bee_line(bee_line_df)

    apple_df = clean_crop(apple_df)

    pear_df = clean_crop(pear_df)

    blueberry_df = clean_crop(blueberry_df)

    cherry_df = clean_crop(cherry_df)

    peach_df = clean_crop(peach_df)

    strawberry_df = clean_crop(strawberry_df)

    cause_df = clean_cause(cause_df)
    # print(cause_df)

    crop_df = combine_crop(apple_df, pear_df, blueberry_df, cherry_df, peach_df, strawberry_df)


    # bee_line_df = bee_line_df.set_index("State_ISO").to_json("bee_line_loss.json", orient="index")

    # convert the data to json
    # dump_in_json(bee_df, "bee_colony_loss")
    # dump_in_json(apple_df, "apple_yield")
    # dump_in_json(pear_df, "pear_yield")
    # dump_in_json(blueberry_df, "blueberry_yield")
    # dump_in_json(cherry_df, "cherry_yield")
    # dump_in_json(peach_df, "peach_yield")
    # dump_in_json(strawberry_df, "strawberry_yield")

    # dump_in_json(cause_df, "causation_data")
