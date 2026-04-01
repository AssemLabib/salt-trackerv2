import React, { useState, useMemo } from "react";

const LOGO_URI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAYAAAA9zQYyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALR/yzZnXAAAACBjSFJNAAB6JwAAgIMAAPpkAACA0gAAdoYAAOzpAAA5ngAAFf7GftM6AABEAElEQVR42uydd4AkZdH/P9Uzmy8fxwU44EDuCJLTAZJzTnIgQTIqyM+AIkFfQURRQEQByQoqAhIkiicZlSPndAcSjyNe3LvbNF2/P56a3Z5numd6dmf3dnGLd15ve7p7Onyfeqq+VU+VqCpRGSWb0x0RxP6/RP7tvkEEEfsrsD1EUKHzO+ncz22zfwcgE0RkPUTWEpE1gYmILC8iwxBpBLJ2fDvCEiRYAHwiIv9FZJYgzwGvichsO7n9X/S63O8qhX93XjugErj76bxWu2sR1O60lASZGiQIOn8/+pud5wRA3UcVRRHc/6IAIXh/KyCqqLhj8serRo9VQBsVXR3V9UGngE5WdDyqoxUdgmo9qCiqqLaBNis6D9UPQd9Q1VdBn7N/z49eY/73ov8bu8321/y1d2JP0TCsGHOzP3qsaFuW/ifDganAzsAOwBeAph6esxl4AfgPcAfwrG37PEsArALsaM9xC2CCbe+JfAI8ATwA3A28BbT1l5uWfqKhxwlyKCIHijAJkeU7tXVea0bO0fnv/DmjWlOCzm1Rzde1vyjCx4K8jMgtInITyKefEw0dgG4CerSqbivoioo25jV3RFsX/B3dnvjvGM2Lapuis0FnqOqfQKerasf/sob+AvD/gCOBoRUc126fDnvKeY2UAWrskzz2YKx9tgd+BFwL/A54Z4Bq4zrTwqcCW1VwXGjatQPI2bMUe5b555gpcXwtMMk+XwGeBi4BbgYW/S9p6F1E5AwVNkOktoQN3QbyhojMQOQ5EXkZmI/IYhFpRaQNCO34AKEWCeqBRhEZg8gagmwGbCAikxEJStjQixR5XETOAXlogGjokQoniOqxKrpKGRt6rqIvoPoY6EugbynajOoSRdtwmjVUVFDNgtYpWo9qE+iKqroO6FTQdVV1Qhkb+kPQW1X1HNAP+lJD9zWgJ0ogFwpyQAmnsBmRxxC5Q4R7Qd4WkY4emhxZEVkbkW1BpiGsL0hjglPYDvIHEc4Gea+fAlpQdofwEoWVE5xCFfQ9Rf+O6t9BH1V0bhVMjiGquinorqjur+gqoJkEp/AD0DNV9TrQ1s8ToIeIyG+BgySQhhgbukOQ2xG5TISXEZnTizZ0gDBWkC0ROVpEdgLJxtjQzSAXI/JTgcX9CNBTFb0cZd0ElmMO6FWqepOgb5sW7i0bul7RiaB7qeqxoGsmsBwzQb+H6p29DeigD8yaLwGPm53c4H2nwI3AesCXgfuAOb18PaH9xs3A7sDWwF22PSpDzCZ9xNiC/iCnAw8B6yawD98BJgP/B7zUB0xOCzAL+JVd07HA6zH7TTZ26bIyNnlVqJ3eklrgJ8D9wFoxTt2FBuSDgVeWIUgeA/YyWutqoNX7fkPgKeCM3n4ZJWRN4B7gHHMAo/Jf4GvAGsCvlyEd2WHPbz1gGjAjZp+vmXLbcaABeghwpzEItd53M4DNgO8CL/YjpuBx0zC7AG96340Gfgr8dhkwQ1sZf75bzHfnGYCuAOb2k+fYCvzVFMQZpryispFp670HCqA3BB60wEiByQN8A9jJAhv9VR4G1ge+DSzxvvuGmSAr9tG1fMsUwwhv+71myp1C/w0QKfAzYB3geu+7BuBWm1Fqqvmj1dY2G5kd7L+A14A9YzRf5b4nDAPGA2Ps3/X28FqAhcCHwEc95EGbgYtsNrkWmBL5bnNchGzvXuatv2Uv3JffASdG+PeemISjgRWAkRYHqDVeeolp/DnAp8DSHvzO68ChwPNmMuUxl7F7DG227neA3hH4QwyYz7XPgm6cc7gBaBdgZWCiacflSlx7uzlIbxu4Z9qM8YiBvlIzZEvgUrML87Iu8G9gf1wYuNqz5i+Ak73tnwHHALd387yr2TvaHBhnju4KZh4myVID9dv2v8+YT/RCNwbUL+0dXI8LxOTlO8BKwOE9HDhVpe02FOQRkCaPtjsT5KxuJCetj8hRIhwEMrZKtN2biNwOchnCrG4kJ50t8EOPtntLRHZT5PUq0nbngJ7u0XYfohwA4X8qTE5qVHQPVI8A3UnR2irQdjlVnQH6R1T/rGhzhclJK6pyC4SberTdrw3cy5yHXhu4TZDVIzz0UpAjBP5aQbbdUAPxfoh8CXHccC/w0IsRZghyNSI3iUiugmy77yHyS8lvdPt/qMg+5TR1CkAHTovpyR4P/ZSiB6C8W0G23RRVPUnQnS3Drrd46HcVfRT0IlV9soJsu5EQ3qSqO3o89JVK+PUYCjVWPvjo8fKAHilTKwHzWEEeAtbwAitfA7miguSknQU5H5F1vNC3D+gW4ANE3rB00E+ApQboJoQxSDARmCQiKyGSiQF0NPT9rIh8E+Q/FSQnHSvIlV5g5S1gFxGZVWDu588BSBC4yHsyoM8GfugFVl4XdDdF30qZnDQU9Lug31HV4VICoBYKfxvV/7oZQOeBtilaY+eZoOjKqE4CHZsA6Hzou92igaeo6tyUyUkNqnqLY2+6AisG6Mu7C+hsvHOa2mK50PjPKGXzDeD3KU+wunuJfLUEcT/DtN+Lxhm/R/l0xXqzGTcCNjDmZcsYHnkDc2J/bzZeGifvKnNIfxphiSYB052dLU9GB4MP7ASb+Qz7ROVFc6TfTeks7w2cZTRe7AxtNuzzxjI9Y3Z5uRc+HPgisKkxFlt4TjLGVBxjFOOFwHUxDFGcfX6wMTabF1CRypv2XnpuQ4+UzdIe+z2Q87oC3ALITwR+TOcWweXox2row1W4DJHGGBt6ASLXiXARyJtVMjk2RuQYkK8iNMbY0O8qcqSIPJgyffRIkGtERLTrN94G2UmEN+IALUV/gyK/RuRbXuh7Fqq7KfpmivTRQFQvV9FjE5KTXkT1EjB7t+cmR62q7g36TVS3SUhOugv0q+q0foyGdphTDQEmgD6oYTjZ3X+IKp+ohpuaM5oocz55sjwPren+294omKhcYxqC/IWBdoLOG/HnWlSp0fvuHeBsXGTx/1WB5ovKUzZ7bGra+BPv+5VMy56R8nx/cIO6QFYB/glskvIcP7T7jMoTxtWnufeNjME5NmaafQA4xGahy6vIV7fh0ga2A/a1IIofPNkTeJKYVFZVRTWHaj5bVT8wBinKgo2xZ9NzDT1cNkkxv8lDgmxDJ6PBE4JsiQt/kk+rzUhXkNC0a0YC+Zsge8Y4hdcg8m0RFpWwoavhFOZt6EmInC8i+8c4hX8Q4TiwLD9KZtsdp8gVXfcoiPAWyE6IvFlCQ58vwskey/EG6E4427Zc+uiGEE5XGO05hYvMhr66jA1dDacwb0Pvqaq/AZ3k7bfYNPWtXfuDao4w7Cg0w5RvgF5qGtq0tx5liiNBQz9VlUjhKcA2ni10uqIdXRpcCKQoALQiLh9hT2/7LONzj6Fvk8LfAg4Ajja+OipHArdQnEwVJ1fGaOpJpqm3TLB3T4+hqJ40zfx2it/c32zP0d72my3KeXUfRwXvstniKs8mbwJuwuVwRJRbBpEMhtz8oPkdbnFAAXetypTobgWHJDgkMbNV4me9QrMCbIq+P7ohI9kIr9oZlbqZ4nD4ozZ13bYMQ7S/BzamOBy/t72MNKC+ADg+BtR/Ncc3Kr8xcy367N8ADkoJ5u1wGYpjYsyXA3HJSstC5gHHmfkQNW8yFpg6qAB4QdZYnwJ8nQzygmd6fCsZjykAXQrOpp3rI7s/BHpRdK+ADKJBdChlbOT53ub1BvDZPQyF19LzfIDZpvUeibEFr6c4wSqtph5vYfJ17O9vA9/09nneUVe8lTIae6PHTuVMA55ThahxfRWixzcbazXfw9kf/Nk5yGR9H6vVwB+VgxUmp4NzjA09TDZOutA1BJ4GaYxEA/e0F2boCsgWY+sKRI7zWI6rROS4FGUMfBt6IjAVka1EZAoi44EGEVFBliDMQYKXgMdE5CFE5pbhoeMihdeCfNVjOe5UCQ4SWFoqwd/OdbwIl3ssx0yQGSLyVY/lmKXINojMSZHgvy2E00FrIjb1UoVponpXijIG0X8HoBsquiWqmxnfPNrO3Y7qIlui9Syq/wZ9XFVbS9jQcZHCNVX1n6ArRPb/TNGNu2YiIQw7CHNtPq15q2q4H8ZZK3qrmYcF8tGnT/cI0JcLHB8JntyJlwKYpcbRdF2yC8i9Hm13A3CIIEogaQA9WkS2R+QgEdkNaEzpFM5DZLog1wGPi8hnKQE9EuR6EXb1aLu7BKYhsrQMoBFxlGYZ2u55Eb6syBspVqzsiHI9hGMiTmEbhNMUbk9ZlwNF18JRbtNA17f1g2mcwjdV9SbQW0BfUNX2lHU59ga9QVUbIvtPB/aJ5tXkcu1omIviZj3V8D+gjQZoRXUbM1G7AP3ZM92m7TYwpy3qCJ5aeKIMEESnhBVinJMnzdZ0GLAdE0IOtcBpuEy9m2yENlYw9Y00u+1u3OqNQyuwBXeLiVbtadN9fYpznG/2ZC7h+1dxq2XeSHGuPczBHOM9/wNIn6i0EvA3ew4/NypPKniWq9m7eAqXXrtOyb01zLMUd5hdH30OO6N6QdS7ywTZCKWnqOrzIHd4puXB3bKhJeZjTEA0ynazoq/k4d4F6IIf+yUO1F12qnA4qotQF+rUMBdDU4PxuPfg8mmXS3hsOeOS37Fo2twSABoH/Ml45skpX+LJdg1R2asCR/EqA1Gc/AT4IKXNfI23bYmB5K4UxzfYwHrctKKUiNrNNofy/TJs0+bGlZ9ZPLidlgo1jILzbt++VzjEt4tjHMRr/YGtMLKcDZ2GtsuaZ11g4xRr5wKZaqR+VI5FeT1KuwSZbBe33CXH2wPbIeZaPjYn7RBcCueaFnrP/+8GNvj+CiyOOX4nC/kenuK+F5t2vCIG1Dek0NS/jbP7TC6zay0lu9sAXD6yrcXCxXenuP5Gu84rbED78pwBbbvIM8x/puAWEPwA+FfMsfW4iPDDeOstHSUX+JD7uc3O+b1GoHphVEsHQZGDeC/w98jfK6McXs4rLLKhh8qG/j5fAnk0EqJ41TjHpV2IrysY+oLcDHJAJDlpurhpvDOLKshmCDLRgSAZRH4owpkxTuELiNwgIpcDc1Pa0BMROUKQo4BVY5zCoxH5fYr00SECN6kEu3mBlbtADhWRhTE29NkgPyxjQ78qwkGKvBhjQ++A6vWKLh9xCpdCOA30rhTZdhNs1feWnk3cgup00KvtPGEKG1pAN1fVb4Dua2UMonb+O6C7q+or0WhgGLb5qJuK6gOKNmhnkIgDosoxzHUQhgVBx31Vua0zAKT6OOjm+RN/PPe57vDQHOntcHUUzAEZfx7b3dNMC4BvKoSdZwwCD8xgU9iZMVPhKRYs+DmVrZt7D5dAtEZCGPWaGE49TprtnuJs6j/GUHq/ifm9R82Eib7hNU37re/tOw2XmBOnmdOYGcuZbe0HdV4wbbwPbk1f2roBilvTeLjNiv7ssDLwDyIJSyJCkKk1CHVq4Rm4tIZoGPwsVa3JmycSZHyr6E6bSfKyWUKwKrXJMYTCFbpL7UdKmRsnFk2vqrMiESGCTMaP+kyLAcFsYFvcQtCeLDdqt6n1UI8bBbfc/4SU5/kmxRlgewN/oWsl9unASTGR0GNxS/2/5X03DPgzsGrEVLs4ZlAfZCAsJ+MM9D5VdS8uS25GFaKr+8TY9Ss680aH5RWhy/DO+OrxJgqz8NYucjAliOIi5z9zVXavMFJYIFvZCMzL/aAzu4Io+Ymy85I3NW2Wl89w6YQFZLqbzjuP2dw0XVSejjgf1ZLrTRv6zMIlBuxy0mH35qfG7m/bzo8JbjxjWmVmxK72Qb2W2aI/N003xgs0pAXzcmZz+gGss421WVyl55gzxsufudcvvH+ziwvx8aY551Ev8ogCY1WEzsQ293nKczunSgnvthygt/X+nu4f7o3AjYuBqR9F+TkJxAvhcxJSMG3PBvYzk6Ha8g6uqKAfnTwLL9+ghLb/Oi6TLSpfoXgN4CybFebFmCQnxWi4U01jRzXzNH9GTJCxtp9vvlyacrBWLqrX2gAtmMVUddcIwxEBdVc8w2Oj9kN1uANESJBfBNElMygMpa+saL12J/Qdw2684JM03hH7xTzQrh8LAv9XDjMwREf/0ai+Rxgmzys9k6dwKaSzYpiH01Mc3wbsGjPt+jbzJsahx8nFMaYZns2cVjOPNs08NWaQntgrWHbV9VDh/8XEGi4RGJXXokGQ8ZmsZ7xBOhFhzy6eWJCgQFG+483Uq1JcuCiVhh6KK5Dd+SIVZhdwh4WHr+hNd+/jcnULAC1K/lMHfE8L545fqTI9r73DnKJhr4D6A9OePhd8ToymTdLUJxBfX6TDtG25Ve6X4kolxMkPKtDMt8dQgJfGONjVgbKGoGE05e007zmuqujenSE5tZk8orVBb/W08G7RaVukCJb+atgNugPokfbJy5tEssGk+NBtKKzxfI/Cwk7wBxkL5HZq/0MoXC70POiPfJZFw1y3CvmlkCfNeXrB235+Sk3904QHmwW+T/mEpoOMM08C9NZljh9jCmPLmKDNib0B5jDsIOxKzM9/PolhgA6KHieWSx75PE1n7jzYvTaVwNa/vb837Q6gl6Mw1Px69CKk2Czfwvv7wULnVXzzxLfP/4HSGpfmF3bk0FyuN0A9xxiIT2M09akljjuP4sy6Av7UnJ+kzLUNTIsmFXmfYCbNCiWUza1G/UXlQjqXwFVLxHHAYYfTnvGpmFd6z3A70MmdjEckZhCZIT+Lmk0KYzqRUcDLd/ojUYJ6cncAvZr39yuFt1kE6A0LvXO3rD0hrJP1qKUc6I2lklfDjg7Cjg6SYuU91NSbAy97239mmtaXn8eA+e8x7MeBuNB3bYz2ehAYFdk212zRdu/5PxajgVcwG/1LMTPLKdUGsxLSEbYSas61FIr/zEEK2Is6o/e6ziQFdvF8j19uxEtxEHG/bp8PPEd+FVWtrxTQfv22/5YA9DAKQ6Bzfa3nOQZTKFw5/KzCMyWXFgC5jg7C9vbeAPUbwFGe1hBcPsoPItvOjdHc7+LWKh6NywWOyh64UmLZyFR5DW5dZZSaO8ZmCv/cE22grBDRzH8x/tZnTr7vTeNVsDJCwo6WLue89AvyF2lsV7i6pOidvRRzrxESpYANW4Ir75aXURSv1unUlGkBXapu83jvBxZGCXRxceVCbS4FEZkHUpOg7R0oSraurjc09VRcRt2GnqZuMfPgBzFsRpQGPMpAdXBkn4PtOd9mNFejB+Z9cYEPcMGXDs9ZXN146lPt931q9IIy5lE3WbmQXG4pSkjKxLznzJTIEwnr2jNbFDVdIvIanSmXgOpqxXxbgcz2CIvhMfRrSUCP8P6e62vnCBc4TChYRLgkOn3GJCBN9q79uUoedtieIyftZGpre0NTH2kmwejILHZhzL7vGYCjD7XZ2JM6j8I8ABeACTym5PAImKPatsZMiKj5cQPFdUV+UW0wC0KoOQdmVSrIMl2Ey36c0OW06jiSM/fe9/5e3jc5PNZ2rjd7NlRqcvhgLxVpqo/haosY64j42V9vV/rgc61t5Nra4wZLT+VF09RPezcQ/aGHzO6OKzUQ4qJfN3rHB55m3geXFRgnF1BcmiAT45ieVu2bD7WDXG5xtMxA2o964K2NgrQzMatwFvcd3VKY8Qtt1lYKaPFeUnuJfTMxPG0p8RtpVl51UoSO1lZybe1UlqueWlMfQnz1n09NC88uo60OJjkwciyFqZFxcnUJxuIicwCrTNIruY7FlpzfrWfaVkbR4Q1qPEeypA5Lg92g5N0la5hS+5Y7LzHOS7cWZgaZDJLptS4RhxK/QmY5YzDKyf4U51Xk5fAkp8YzM/ZN+G6XEufumcEhPVpvHJR5z6WUYK7sxZUxsssBL/ROVlfByCz3VOaWnm7SSba+jiATVF9ROdu0VA7ErynNQ++Oyywbm/D9zrjwd9LzH27sRlJEbA3T/l+o9o1nsg0EQbcd7oaYmYpCiqSAqsPzu6jABM5VCuilMQ+50xmUwv+WxNxY0OUxFwHuHW/srRG79ivxI9Q01LuYf/XzPX5KMZ/7MAUrLjpt2LjK83saGDMeteebGAfjeOrh3vYpuDonW3nK5W7Pj1keF/beqOqgztQTBLWe+1D2U+MppoVRZizmPflL6z4pZFmK9h9WxqYuC2i/9tuYQn2v/r4LPBu5vsTs4DcLqqgodbauFsn0Sr+jcymubZdvp7FPjGd+gaepdzOQLu9Nu98xre33GtkLl74qEaVxXQxIz7VrONvbvhYuA3K96oO6jiCoqWT2m0BhZPMdkI+KVqd2yaqeTzQ7v1KJ4sgi3mzXlkRSlEKF//JWKmHCfEJhOa0RUcdP88t8uu7tBW/AbEPyYliinnK2ttYVDq9+ztJ5FPPM+cWlzaZt9qG4Bd15uESlnXBBk4xnWu1F1zKjYyheOHsoLiCzpVF4m8ac/4yIKeTnaYzCBVs2rPYDCTL1buVJ4btL+uzoOfszRAi7sBniAXZt7yW+UThpa3R3wcU68jKPwiBYKkD7VNrkEhq6ncKGiyMpDp1H5WMKM9UmCLK7kPSf40cztbVxS7eqIXHh7Jm4SN/MyLZnTNN+EGNT3+nRkR24COK93jQ5zexr34F8kOIU0F/EmD+Xxswia5qmXqfarEcgtQRBbTRLMvaDcph38F0lTIiAwtztHIWRQB9fYyjM/PyY4jzzsoB+x/NS1yrxg1C0vEe2jg7fLpK+c/rxV6PsnTT6JQjI1Na4oi7Vt5l/SXFw4nHTrJ8lPJe9PU1d4znNH9pguCnm+HbgMIo5aN+RPp/koMnPcOUJos74aIqjnNUBdVCDBFnUNwm6PrtTmGw2C+T+zheogIbRV7qi59AuFPi0Exmar5jUmc0xicLcl1lJ8YdSgJ5PIfk9JUo1xQD6kRhPPzpEfWvqRu+F7AeyeRyig2y2N/I38sDwE5CexSXwzyxx3NNmJs1K+P4Yilb3FIF6GoXBl6icQ3xiVFSuimFi8pp6k2qDWiRLIFk0vnKLX0n15qiNq8XrcSd6LMcs07pJ2Frf+/v5tLxhVBZ4an0MkQSSaJGZCBCidtBUgTXzt6xhvppOp7xE4fqyALhQhOGdAz8Qgmyv8cznUhxpe4niQoNJsjrJlZzSNOZcsYTfsEKMV59EL36bwiDFaGNZJlf7gYkEBJLxnbw9gO2jjIzA3V1wF/OhJPrZxbOfp0c1vocTKE5NfqY7gG712QiBlaPjUikwI5ZQuMqiDq93ShiGqEjnB+SHogXO5Gbk16mJWA51r8g5MQ7gf4wqeynF8dNsRkrKV76c4sr8PgV1N/HFdMDlk9xIunDdRTGmydq4EgkbVh/U4hL2Xc7yurgFzlEcXQny7y5TM0Q1F8XrEDO5opTkzYWTeehTwFt5lsPTqQHtmQV+FtxWRVNR4TH/KrKLI4R4GNrynS6ZYzZsodcvckIvmRh5zXx6jGY+KqVm3sG9tAKi/90Y8+Mi4pdzrWT88bqeCeIfvyuuxMGIFNf0a/utNm9G9bvgVlMmGLsy0qM4/68rw0NshUuBfJnCxpuPRE0ItbWkEUyt7+3/thCt1ppeQ4NbVh+dzvYBqe8cfcW2zsMeA7AWyLZEWr6FudBGeWcho9+g/NO7pkvMvq22XBCjmR+zgTozxfEHGGsxzPPQDzcu/dUYxy66wns5XOHFbWOuawrF+dRf8cyyUvKrGBPqi3Z/O1T5Oa5mtrq/WPUEEfk4r8VdL5UwqvLqYtikywvJg9BXrZt5ZPGsntS2m0lhhOwL0ZehaL4YVf7zGcWrgH8Y1WYahoS5XPSYnE2x/oLT03Dh4VWq8AImGY303R5o5m3NEYtq5s9wK1AesX8fQXFruHzZgnHGekxOsOXVOOlbvO/3sGl9eEpQf8/T1CONUTmCdJVTy8nuprj8RQZnU7DsTkE7/Bl8G++4uXglcmNSVv2g270lufMYK8k3PK6P8eAjBlBHnE0XDcpsg8hJUSMqzBUtfP0Al93mLyI4EZc4fhTdS2CqM/PiOQNGVB7FLc58PcV59rPZaoSnmb/iAfBJO+drMc5bvhRXVC70tGqbPQd/9cdhti3NM7iA4uDLSFwF/Qc9U6dSrXyX2f4reJbnGQj/V/COww4LpnVuq6E40vlnIlmLTjuH0dOs5r23T0W4Kz6QmBrQcgeFyUS7C7JmV8jD0TKRMMhnuOhWVE4XmBg9a5jLxaxgYAdzzqIyHBeBexpXjmubMtpqtAHnVAPYOTGMwSO4XIp5KV7kLvbgaz3NcrCZD768a87wO55jMyaG//5uoUYLQbUN5RBcQn9UtjP2Io2mvsp4ap9Hn4qrS3KLXf86JQZJxmbk/czJfTpGKbTaYP1FAb7DfNu2IKoYT6cwCjpHXBcy8h/t7IzVecyRFEYf7wT5OCGU7tBbXMF/oxgWknsF2aWrxaacjouu2ZaiVhQjQF4QmBhpjXwtfvkoETLZrFdRn0ZErkbk4BJt3eaIyOuI/BeYJyKBIKMQJiHBF4FRJdq6nYtwuiCaonn9vojcIFAXaevWJsgOCP8qUcEfkPGI3AOyfkz10Z+DnF7YGhlvgGutojcJuo/X1u0BRXdB6UjRvH5jRW9GdeWEtm45VGcq+gaq74EuVrQB1XGgUxSdjGpdQlu3uageoOhD5H8fa9mWK5q1twN9oKA1soaRlm2Cage5XEEa/TjXLYAxdt2qqlOJBOQ+nltcFiUbA944ucM0VecULMh5RPoSWjO3KLVylmmKvByB8IR0VlOSTpvJi/ossan8Ppuixsdcz3j7bFvBlPm6OZrXpdx/S3PI6rxr+zrxNZN9aaa4PEJe0pQ5azMtegOFK6i3B35ns1VrmXM8hUt0+pnZ0HUxWjhfEzqt5HCF4E+JMa2sMFD0fWoj8CNvr2cR+XOB6drpV3XK4aBjPMKhbK3DtClrV3n87Ca+nZYrtqWvxq8MpFyCyP4igauilAlKMa1Xm912JD1rVfassRBrVwDmfcycaPIAtjvFhSXj5AtGRe2Y8P2lFEXXpLO2dUSSSoIdG3N9SfIZrm7fGsbxL+3mc2wzmm4zo2NfK7BSbRWWe7eZvBlRLyK3e75DqznJ7V3aOeenNGQ9rhrg1qh5kjr0nZAe1GZcZ1ROBhkXDbOE5CLJRGBmybsxTmNawn+pcanrmC13Gy6H4hPil3m14fIoXjLw7m12258ovyIiLztbUKPB08zHmZYoJ6NNAUzygPlZDCNxUkzkghg79eAY9mMre5Zps/HftmDPmsZZP2qKYgHxtaIXmR8wA5cjvqE5rE+nDcCY0+sP6tNE5N9dwIQwzOGB9UjQqPM6m+Q0gXI2dGIXrIzAUyDrR3LgziFS11mATHEnrA0Ruc91l+ps69YiInuo8ECFbd3cNCkyVESWR2Qs0GRt3ZoRPkaCj4DFIpIr0xo5rgvWgdbWrSFSwX+RwM4qwYyE1shRG3o1kOkirOq1dTsb5HIRuR9kite8/juI/DpFW7cMhLfg2dQKj4vqnir6aQVt3fJ/16E6UtFxqI4CrVO0DdUFoHPU2clLU7RG9rtg1YBeo6qHefvfoIXFOcnl2syB7JTVUR5XDUdG2rodQ0xxzFRt3YYnAxrHccp5EUB/Zj2+X49q+Aw1EXtIQWQPEbkNqDFAIyIfqnAUIvdWCOhq9fr2AX2cIpeJSBBx7JYi8jWBP5bo9Z0H9GgRuRlk22iPQ5DzEb5v+64Bch/CClFHFJGTBLm4DKCBsAH0T4ru77WkuFdFj0L1wwoBXa1e31FA14NeAXq4B/KHUd03yvmr5nxHEOAqVT3GumihypOKbhk3I8cButJlH+dTWFF9tFFajdFgS46OguVSxl0e4/mc43DLkn7FspWhRodd4T2PZqMR09jMU8xh2TaGmvu+R01uGxOV/C3xbTPiTLCDKG7ntqtFKXddxs9yqvHtflOm+3ALIOZHOWcH5gKKeFecNo7KrwVpj8+S7x4P7XODp3qOxUaOZ47+UIgWm6x/NH7WH2nfMWCvsgxewKoWeToyxhb/OsVlXONkiNn5q8ZECH8Qs/8bxue+HxNpOz7F73UYqP1c6xHmY5xagV1dTTnIgk9+b/NnLDDWHmUHcrkOn9UYS3E7jn+IcH1SGnZPnMLof0/HBE6+X6gdXFJKqEXMx5/sZX4ao2GeMydiXB88/HzfwpcoTk18zRygP6c4z2RzmvySAj+luPWED+pdKU5IupzyedB5R/GgmPdQb474C+bAZfrgWW5rs9MNMQGsy+35FgzeMOwwUHY6gQLyFwpXOf0X5KgyyrXHJkc0vBqtq1zrpm1ZI8W08E+7yZdjIoLfNprtBLpZ2qCMjMIVb3kZlzfhL7t/ArdS5eUKNPPaMebDj1Ic/7IN7tkxZsrRKe/nFDPllsQMtD/jVo9vTfmyEpWK4ELod+LC6ZvEhDPy6x9bC7/QzpK5kc/JoNt5v/BjROaQvEqmahoaQRbiiqC842m9G0BG5uvSSHGBvrzMMlD/H8XL0cfhsu1m4XIHjiLFAtoSsqLxtg/bOc+kcDlPXuN9064pTbvi1U0z+2sAz6F0HnTcc9g1hme/mvQV+K8xsy9uhcw2BrjXjPvetgfgzpdAPgeXJ/8kbiW6L6/gSv2emkSVuuacnQsFTo+ZaS5D5U9lq4+loe1GSiUFeeRYQa7MDwQbDvcLsi9Ic6TxZrR5fZ7lQJ3TuJWIXCHIGiVYjrmIPCUiDwAvIPKmNaNvB0JjOTIINUgwBlhNRDZFZHNBNjdqL4nleBTkRBFeTGi8mW9en2c5RgjyCMI6HstxsYic5B9bovFmlOWYLMg/nB/RySCooscI+nsv9E2Jxpung57hmr7HshyK6pugM0AfVvQVVN9VtNlxZ6rW0D4AbVJ0AqprgG6pql8CXRtUEliOHOgFqnoW6JLYhvbR0DchqrqTU1pam09WU8KHUXZJEQXlg48fTwPoqRXOPfId4FcRQCPIkyA7C8xPAWhEpFaQXRD5sQgbpaDt2kSkGZFWoENExABdjwRDgWwK2u5uRH4pIjNA2kp0ko0CegoitwiytkfbnQr8Iu7YlIBGkDUdG6STPNruHEV/mBLQuHCxHqGqpwk6KgVtt1jRJai2ucC1BqjWgDYq2mSdZEvRdi2gF6nq5aBvxe2XAOgTVPVCZ65qPvvyXdBtSFm8c/ZHM8oDepRs3p3p6HxBTqaw8MBDAtNAPkkB6LzGDETYE5HTENlQhNoq89BtIPcjXCTIdEQ0RWvkPKDHCTyEyBSPh75EkW92Rce6DWizfXU66MoeD/19lPNTAjoPotGCnqjo8ahOwNXaryYP/Smq1yp6GegbWoKvjgH0NAhv7MKeomH4mUst0NS9KXsT0BlBfgNyQmElDd4B2QeR51MCOm9yBIisJMIWIHuIyA6IjO0moN8BHhGRGxF5EeR9hDAhUpgE6P1Ugt8JjPUCK6eJyLkJ2XbdATSga4HeheokL7ByB4QHgy5NCej8sU2ofgF0V0V3R3UT0IZuALoV9EXQ6ap6O+gsVOdpEnjjAZ1R9DeqfAPCCPZ0nobh9lBZnfDZHz3Wa4DOg/hyQY6PABqQ+YgcKyK3VABo3+QYjshaIrIZsBYiq4nIcogMA2rt+FaEhRb6/q+IPIfIc4K8ACxNGfqOA+WhAtepBIEXKbwY5KQS6aPdBTSgq6F6t6JTvEjhg6BfVfT9CgAdBaiguqLLk9BNFZ2C6kqKjkS1CTRrKaVLQecq+gGqM0GfVtVnXSdY1RSh77ht9aherOgxERsaYCHoAajeVynm3v/wP70O6AZBfiLI9yKABpFQRC4DfiSBzO0GoONMjgCROiBjx3cgtCKBdjP07QN6PMhFiBwgEEScQhXkJIRLyuRD9wTQmIa+UdBNPKdwjqIno/ylG4BOMjmyqNaCZhQNUW0Hbetm6DsO0LuAXoTqFM8pnA3sA/p0d5qsxgG62hUPl1pg4Bsxv3OCRY22rtJvhfZ7zfZpoXoV7/bC9cY70HtGbRbNu6QPAhZv4XKf7/K2j8cti7upilx9h3HZi3AFYtqqdN4hRsndRfHq8+eMRny6mg8t6KWXcZkFDfwE8JUtzP1Xiqvh9AfZ0oIFd1CY/gkuAetLFC5a6G1pxmWnnR0DsgMNDD+hfPH0vpYGU2pP4xbtZmO4861Tcv79AtDgVjVsS3E+RCOuNsO/cDnWK/aDFzDRon7/SggWXI9bffzkMri2ZgtA7UVxu+VJFpV8DJcQVLuMn6PgEroetUDO5JgA1jH2WdQbFxD08g1+ZNPmERSW2wW32uJbZob8xdlSvX49/nQ4DVfq9mW8Kk+RSN7BFiaft4zBMt1mtd8mRC6vwy25Oo+qVyEtK6vgFsE+gcusiyvC/leLxF7TqyOqyk6hVwC3IFK4MvALCeSgEk7hSyLcgMj1iLzVS/nQ6yDsL8iRiKxSwin8I8iJluBPinzoajuFcfnQeWdub5TzIJyc4BS2qOr9gl6n6L2oLuyFfOgGVLdXdBro/qo6JGkxraqeAnp1TKSw654rcQo1RFFmf/T4MgV0nofeW5DjRWRnFWoSWI5WRJ4U4SGQd22F9ywR+Qgr3JAC0FlElhdkbWCSiExGZAuQjRFqEliOdhG5E+QiER5JCH33B0CDMgTCkxQOFdW1S7AcH6P6COiTir6L6iug74AuqADQTao60ULfE1V1fdCt81x5Asvxgar+HvQSVZ2TEPquDNDqsu2z2aFksk389507+gWg8zz0Niqcgcj2IpJJQdstEpG3gfcReV9EPkVkAdBqoe86hOFIsDywgoisgsgEQYamoO1UhL8q8lNxwZdSuRz9BdB5Hjorqsep6CmorpKCtgtBPwF9y/HZ+oEttVoM2mEUXgMubD7WeOtV1JU2qElB280DvdDC4QvL5HKkA7SGKCFBUE9D4wo0NE1EpIbnnj+naNfsMrQJH7bPlriacduVYT6Gmm1YLfswZ/b7fbgFqE8zMKUDV9bgD+YT7GR+y/gSftNYkjt0dUfm4Yr3/ANXn++TqpxVXbG5bHYIdfXLU9cwnkymwVaJx3eMyxaTux0p9XGQuAymQvm3fWpx6ZgH4FZrr0wvdNTEpTf+A7eC5lk+P5JfIX8tLj12D6P2tiFdrenu/N6/jea8meI2HT0Acl4j19HYtBINjSsiki0J5ERAj56wRnIko6OdXK6D9pZm2pY2E4ZtKBB0lnzqkbTZKH8Et3RpfdPeK+JK0K5m9Npwyq/E6DCtMdv44znGeT5hhH47n2+ZawP2j7iOXJsZ8zDBqL5JuLzzNHU9WnDV9d/C5W3PwS3umEFxYcoeKmQFck4jN4yjrn5cWY1cFtDDll+p7EFhGJJrb6V18QKWzP+IluZ5hGEbQgapjhXTYg9shjdVLhf5jLAXku891oaLduU7JH2IW5Sp/G/Lx6ZFo8Xoaw3Q+Wc5xIIhGTPFWo0nnmvPcg7dL1BThrZWS8V2GrmhaTXqGycQSE1FQE42OXLpTpCpqWXIqLEMGTmWtpZmlsz/hLbFC2lpnoeiBGSrbTGE9nI+Hpi4kl6yoLo9G75LcRGgvn0e6iqUZrNDqasfQ139WDKZxm4BuedOoarVI4Oa+iZGjB+KakjLwnm0LJzLkvkfE+ac1kaDxNJNA0e024AUySCZbCLMY4EvVo308zbBqHaWzc1km2hsWoXaulFmI4fdBnJVWQ4Nw85OR/XDR9EwfDRDll+Blnmf0tI8n1xbK7m2ls6Xy4ABt9FjQeBASWyHptJgDpLBXNbxloyztDRHfLWugfQYXTuSINNATbaBurrlqakZ6drFVQHIvUbbaS6HAtmaeoaOm0hTuCKa66Bl4VzamufTtngRYUeb63YUBBFOt/9pY8nUkqmpI8jWuUHYqV0K1G8JrStVGLyCSNZOGqJh2wDQ2mogdTOMBDVks8OprR1FTe0oa7lMZ0Ohakqv8dCqIflrlSBD4+ixNI4aS669hbbmBbQ1L6S9dSm59hY0F0ImUy0asMdTomSyZOuHENTUd27Lg1ck6wG/LyVAgjoIW+MK+SxjMyLXqQiCoBYJagmCOrLZoWRrhhIE9b0G4j4BdNGINXs7k6mlYeRYGkaORXMddLQuoWXRfFoXzSXsaHegyWSW0YsJkZoGapuGuxB6bPRqWWtHQYIG0DY0bO3l61Hy0cnCqGCYvxJnigX1ZINagkw9mUwTmUwDSAbpLA+svQriZQDoAmhD2Km6qWkYSk3jMJpGj6Nt8QLamhfQ3rqYMNfRh8B2bHq2vols/VDzwPvztK6I1DrzOmyDqmtrB9hA6iGw4s+B+T8oQaYeyBBk6qzGRo19h5fQ1PezSHZZvxh19VIJMlnqh4+hfvhy5NpaaVnwCS2LPkPDXDedqrTvLkSyNdQ2jUKytQOIWXCgzmSyhLmlVCdWZD0Cg3pqakYSZBoLPQLPHyhYta39wwTK9pvXo0re6M7U1NI0ZiJ1Q0eydMEntC9e6JJtqqaxpXMwZeuaqGkcDkHGbwo6MOgDhCDTSBi2otrdVWimkYN6MpkhBNlh5gQXDm7V/j/Qs/3yNRm4s3VNDB07hLYlC1g6/2NyLUuQIOgxc6AaIpksdY0jyNQ1Fjp+A1SCoB4kSy5cDKkpMGcjB1JHpnYEQdDQBeQB+jyy/Vr/aAgKtY3DqGkYSsv8j2htnu+imUE3gjWqIJCpraeuaRRBpiauUfoAFQXJkskMI8wtQXVpCc5czYSoIZMdSpBpslkrHPADOzsgXpXVPWsYOY76YWNoWfQZrc1z0TDECu6nGhxBtobaIcuRra23HjefFzAXAjXINCFBLWGu2VX46uzqE4IEBEGj20dqcCkyn5+IZHZAva4whCCgYcTy1DWNYOnCT+loaXYmRIK2dt8F1DQOo6ZxBIFFpj7foqZ9hxPmmglzLY6VCBoMyNkCk+PzJNUGdD0ui2skbnV3JkaFLMFlwX2IqwFRsdmgqki2hqZREwhz7bQtWUBb8zxUcxZ5DJzTFyo1DUOobRxJpqbOVkt83sEcfdQBQWaYsRUBXWuQP78JiNkqAHgSrnXXrriWYeMp3yS9DZc19zqufvFduHzlxRUBGxfVqx+6HLUNw2hdPI+OlmbCMEQkQ/2wUdQ2juiueTHe7inE5VffQS8tvY+RMbgE/ehFZ0wR3EFq4lkjh3YLyNvgei72p/zxAJdefDsxKa3dBfQIXDPHY3G9RSotP1CLS9xfEVfH4Wxc24I/4qoSfVAxsLM1NAwfSzhkFLn2FoJsLZlsXU808ndxRVLychx9V2RmdVwjI1/+i+sJs7SPruMk3Aqi/ibzgYfinkN36mDsgEu8P9dGbzVqaQhuNcrpuHV+lT9ESxySIEtN/VCCbG1PwNyIa/QZla/0EztC+/j3+qs9pUnqO60MwTWGuY/iOmXVlLG4NWr32NRb8b1qz3nU/ShsYAOuSMqqDMrnwoYejaswVK7QYguuCtFMc/ryjeiiA2g5XImodWyQJMluNnj2pspr11LI4Qn+wqb0rO/4QBMZaNeWBtCNuPVopQp2/ANXouoV3GLKNLKCafojiC/DBa7T0gPmnLzfRw9qA1wpgDg53map/xU5C7jSnOJKpRnX6/HImO9exVWj7c7qajFSYW53Af3LEmD+CNeKrTsvebZ9HsDVZbs8ZprHpvlf4WpO9IVsUsIU28YA/+z/CKBftE93JUkxLDCnrlcokFJyFK7XXJw8aUCvhsa632zU6QnfHwic1kcv8YAyz+u4QUu1/5ospQBdS3JX0zdw1ULfquK1fGxgejzh+xNxdGFvyhdxVYdKyV70TuGWQellQG+IC5TEyRm4Wg3VlmZc48owwebespefx9EpzLAVgfUGoTPwAL1zwvbnjPHoLXnCTJA42aMXf3c4rhC7L3H8336D0Bl4gN40YfvN3fR6K5EbSzhsvSV744I7UQnNI/dlGj1r1zwoywDQSTXBXuiD63opYfs4HI3YG7JdzLZcgje+gvkQgzKAAJ1kSy7pg+takmBH19A7fUSGJwD6NVz+RlzuxFGD8BlYgE6STB9dl0Sm/Y9xEch7cNHIasseuD4hvtyG45zjuNgte9kEGpRuSCmPflGJab+3ZbYxDh8B79nf8+m9ZJk4bdtKF8d+bYJPsQXLpjPWoHRDQ7+XsP1LfXBdn+Iq0v/d7Ol5vQjmDXEZhL7MxOVr5zX1ZzH7HDAIoYED6KQWDfvQP3oLVpPdiItoPRSx4+dQ3NE1P7g3G4TRwAD0PQlacXlc/sbnRbaK2aY2Q0Tl6pj9BLfIYVAGAKBfM0csTr6Fy6Qa6LJeAqAfxS008GesuDTWvahuA55B6SVAtwI/LuFM/g742QC//6/iqEBf4rqdLiE+z2SsOYeD0s8BDS7EfUGJ70/DrXHbfgDe+0jiQ91zzNyKkz8nbN9xEEoDA9DgFor+rcT3u+ByL/6Ja1Y/UGQ/4qOhj5LcZ+/vuEUMvkwbNDsGDqDB8bR/oHRVkh1xS6buw6V6bpgwnfcX2T9h+79KHNMO3BSzfTkGKbwBBej5BuoTKF07I4PjdC8GnjLH6gfAWv3Q3NgoZvtcXPJVKbme+GjlMfTvNXiDgI6Ry40ZuM2cxlIiuIT5c4HnzSz5hoG7YRnf987ERzzvpXyed74BpS8b0vv52oNSZUADvGnT9WTgItz6sHKSNcfxUly23qsG9GWlub+WsP3KFMd2UNjEMip7D0Jq4AE6L+/iAixfwFXYeZyElbgxZsnKZoq8gFsxvk8fOlUbEF+O4fky9nNUbkrwJwY19AAGdF4+NZt5Kq4swSFmhzanBPfOxqLMBC6zAdKbcgzxGYO3kH7hwjM4VseXLRhYTM8goFOA+y+4VdpTcDUZ/m42ZzmwDDNT4CncusKRvXTPUxO2P1Xhef6SsP2wQVh9fgAdlQ9waZe7A2sYkM7ChdRLyXCzzZ8jeRlYd2UjMzl8eZXkdYxJcivxvbIPJHm1z6AMYEBHpR2XC3GmAWpH4O4yWnslXMbbIVW8jgMT7vk2XDWeSmQR8RmJw3BleAflcwzoqLSYNtwLVxXpxyRTgA24cHM1pvFRCedZSnFmXVr5R8L27Qeh9b8D6LwobhHBT3Ac7mMl9r2Mnucd745b3OrLQ8Csbp7zLtzigzhALz8Ir/8tQEflFdwi1aREqCZcAfAhPfiN4xO2392Dc84mPhQ+ZtA5/N8GNGZ2fA9XmDFO1iR+qVQaWRFYP+G7GT287qQaIocwGAr/nwZ0Xn5IcXJ9Xr7VzXPuCAyN2f5PkpeapZWHEq53o0HncBDQeSftFwnfbUZ8uYFyksSUVKNyquIoxjiZNgixQUDnna24yqaN5kBWIlOJr1P8HtWr0XdTwvYtgLpBmPUfQDfi+OCtcHUyJvXRdS0hOQAzscJzHZyw/U5cWmw15CG6Sh5EZTLJkclB6SNA72uMwuO4CNprwCO4Vc9T+vDaPkrYPryCcwwhOQOumhVUW4E/JXx3/CDMli2gVzc2YVPTzg2evdhXElbBTJqcMKvMJbkgZE/MjrgaeHsyGApfpoDuKAGm/kBDVTKoDk/Y/rcSM0B3ZSYuEcuXYcChg1BbdoBeRHKn0sY+vLakSNvClMePIH5VNySv3u6pPJKwfadBqC07QL+a4OBAfFGW3pAxJFf2fCXlOb5MfMmyp+ilDky4HJW4JKeN6B7dOChVAPQLJKdSHgJM6IPrOoz4FSyfkD4QktT78EZKr17vibyUoKWHlZgtBqUPTI5bcTWZ48yA8+ld/noScGoJx+vTFOdYh+Teio/28jO9rsQgrR2EXN8DGlzSTVJOxVdwTeZ7QxqBKxLs51bgkpTn2Yz42tdv0vstNW4nvuvtegxWWFpmgAaXspmUVnkmrsNsNZdJ5dsgJ730a4hv4BMnByVs/2sJh7daspDkUmJHDkJu2QF6AS4oEJd8n8E15cz34e6JNOFWgD9Kcs7zdNw6wzSyMfFZee0kBz+qLUmrx7cBRvfgvCF9GwsYcFKuyeRDuASb64iP0K1v+9yPy794ma6K+3EDQcysGG/HrosrobVmiWt4DtfgPu2K7COI58sfILk8cLXlPrP1l4vxQTYlnq9OI2OAc2xw9lZMILBZ7Fekq7kyoAANcIc5NH8iOey8Q0QrLjI2YkkCoIcbg5Gm7t0/jFmZm/J+liM5w+3aPnyuc3DrFOP6gh/dA0CPAE7ug+tfjEt1+FwCGtO+U4Ff46qNlpKhxOceV2qH/gb4KeVLjkVlowSHcq5p6L6UPyYAejdcSH5mP8ZFSO9Rm8vMhvblNVzC+n4kB16qIXebOfKjCsEMya2TX6b6oe5y8ijxq2GaSA7J9xeRgXr+bDeO+Ztpu4NxZQHWNpu4u9KGo9OeMmblP908zxBcJHMhhdG6ISQXheltuR5XtiHaIq/ezLOfmC0cJx023XcsAycwi0urrYaGXmL3GDVdGqhe2m7xSFEtfF7rrfuD7rAUG+Hquq2Ny1celmAjK66MwVzgDXP4/oMLZ/f0xdXiShXkYr6bXwI8vSm1ZvdqDEv0WYlrqrHjlpWovaOegrrRFIp62rmtGqB+/oVfVEVDxzkQj1Ac8g0SHlRvaZw24MN+NnW3ER9xLSftJHcRGEiyhL5ppV1VQJdyLAZlUPqtUzgogzII6EEZlEFAD8qgDAJ6UAbl8wVoGRyg3caADJDfKft+41iOFXBL/78cAUoLrspQNHl9FVx4uolCKm4IrkXFJ7iKn375rjWA/8O1hlgVV6CxJuYc5+HaRByNI+ZvSbiHOlwq6352jpdwmYDRpVon48r35ux+ltj5H47scyAulzluCdXqdi8X2d+H05UEpZHnJLgMxTdwLfCepbCq6hBc0s+Zdk9/xHHnrbiEoCG4wMtjdg++7At8M/J7OVxeyKV0RVV/gGvzkd9nMXCV3VtUNsE1bsq3ALkGOJtkdmq8PbPv43JVJtnz8N9/o533jsj7vhDXEa0Dt2LoLLvf3XGl35bigk9ZO74GV+cw34r6K7iuxaNwNOgPiG8JEgvoYbggySRc5K4G1wLtMvvuYttvDC7d8xK7ofzoq8e1oAgNRKdRyEXuZze31AbFusBvKQzE1OMWGYCLtJXil6/DBXS+Y79zkg2+jSPg3Nq+e9jueRVciP1IuvoSHgK8DTwZ8xsHAV+KAHoj3KqYC+lahZIHdL63zBamGKL17WrtJV6IC8U/Zvc6Htc46XJ7Dkl5Hl80IP7CfmuEAWIi8F3bZycD2a12rkm4xKyvRkC2HC7i+6ida5SBdTzw9YTfHmrXeKb3/i+O3H9ewXwQUXoP49Jpj7JjzseVdTjEBsYD9m5OwOXf/90G9md2ji/bOz4bF+vYEVckaB9i6nNnE6buOtzKjl9Gtl9qD+kmGyVZA9pPSkwPn9qLjzZ9n0pXXnKdabOflwBsKT57KwPMusA7tu3vuGSqw+hqQl9nmuH3kWOftIF0jz3Q5YFjYwBdY9uf84A50zRRkizBJXJNpSunI6/JMqZdz7O/18aVODub0oGnGlwJs59Ftv3MgLmBzQg1BpLou7vdgHSvDfKjcSmuR0T2ec2AdxHxCyn8XOwaA+TZJa73W7juYtEuu4/bdYyz633Wtu9h4P+ld46v2iC72v5+yJ7fGXGArsTmnGUPY7mU+4f2Inf2BtC4pOmiGzIBl7vhL3l6g/jGmlF5wjTZCPu7xbSBnyI7GdeGrtLQeX4gnpXS/he6F0WdZ+bdCiX2edPuK7+4YMWYWeAdm12GUz0ZRXEi22zTtEHMM4iT4TZzRuWfJNT1rtSJqvSB30FhuumX7KE9W6UHVqogjqY4NrpPq70Af3X2Lt289wbTnCvgMgd7U8pdW53t01Zif+nmfVZ6Xa02432Q8hwvmVkVtSYeIKFCbdDDi63HdYNdy6bNdShMqplpjt9qEXA87YFqiO2ztn2+SM8q9aeVdUzrLopcy3QKa4/U2CD8N4VVREOzKSd5193kzUZzcD1kDjPA9EY6QL3NmqVyRg4HXozYpdVSJg241UZJ778a8lv7jafN/6qvlOVIK202df0mMhIbzWnImxTvmp29p9lmu3v2cqtd7KVmF4mB6GQq7xtY7lr3tIdRY6bKceYtL4pc+19sv3F23XsbcGd6JkyrvcDfRa47i+usG7W1m4ydOdRMj5/2UAO227WfZL85xOzgR8yEwu7n67gWHxm7rnlUv0VGe+T9RxmOH5t9Xi15DVckdD/gRPNbrjSfoKqAzjt05Zbm32Wa+Q4DxWPetPwkvV/pvsOcs+UM0B3mdd/hPYu37QHua6zOUTY4J3o2XoP5B+WuOz8DXmi/dQ+VL1qISg630j7fni7ArWQ/17u2u3Gri241wF3QC8+0zvyqvihztgDXqewPuIZM99qzuLCaJkda+avRN9+zaeOdKp47LVHfaHbYNkanbe2BOfo8HjRtNtE0w1XlprkU8qj93hU2cLpretTjVt9sbabQFnZfzd7AfM+e9Rk2a6RZgOHPHCvH4KMa9nXG8JBN+X5X8ijdB3AVAA7qqQ2d1wiV3tSLxrl+A7dwtJqSs2vKxMw8YTcBc785h981imku6Rb0lpPTjYddmfQr2Hsqf8J1QvhVzHPLxgAtsBlkPI6fr/G+z1T4/jXm2dXhqN80JYaH2iwzLoaRyfQU0Kfay321Gw92uj3Ee6r8wp40O3XfyLaJNg12p+RX1mzD20yzXVXhTFBKZgOnVPF8aeUwHMcdrZ/yII4bHuXthw2AOXaNh3tszzsxFFopecLeTbRo5sFm+s1JcfxCc3ZP8rT2d5Jm+myC97oYF2581E6wPK70wE6eYzTZbGI/bH0FXREkcGT4PXRF//Ky1Gzbf3mDa6g5UDfadPpds1fzTs5cXKTpXVwk8kpc+YIWczzvpvtrEzGtcKDnmEZBuAQXTX00oinyuSSHkxzpu9XMgNpumk7dMcPexQVwfouLMraaX/NdM1+mGzOxjTnK+fV/v8ZFGPe3c25qjll+iVuLmWT+c24yB/hWey97meK51wbQrriAy9KUz+BcXLBscxynvaH5EdumBfSndjGfRV5WzkD5hKdxLqB4zVgDxU3dX6crbOxvvzDCk0bPkQ93/zNCh6ld0yK6Ah1X2/4b29/XGGviT73lisz8PjL7vE5XvgG4MHGUkrvXXkB0Cs4HRxZHwOvb3ovtvH7ByY8is0EpeYjyq9d/H/P877GZa7hpPDWtdxwu2NKMy9G4OXLMzQb0qXZfp1C4zC5f/9DP5aiPXGMHLvfkRDMbFhmDdU3MdV+FCwD58og557vbuZ+xgRaroYsWyQ7KoAxkGUy3HJRBQA/KoAwCelAGpQ/k/w8AZpMvGko32GMAAAAASUVORK5CYII=";

const INDIGO  = "#2D2D69";
const INDIGO2 = "#1E1E5A";
const INDIGO3 = "#0F003C";
const SKY     = "#4A90D9";
const SKY_LT  = "#E8F3FC";
const OFF_BG  = "#F4F6FA";

const PERSON_LIST = [
  { id:"CS",    label:"Carson Bolt" },
  { id:"SS",    label:"Shannon Sharp" },
  { id:"AL",    label:"Assem Labib" },
  { id:"CB/SS", label:"Carson & Shannon" },
  { id:"SS/AL", label:"Shannon & Assem" },
  { id:"CS/AL", label:"Carson & Assem" },
  { id:"Ext",   label:"External" },
];

const PRIORITIES = ["High", "Medium", "Low"];
const STATUSES   = ["Not Started", "In Progress", "Awaiting Response", "Completed", "On Hold"];
const STAGES     = ["Land Acquisition", "Planning & Approvals", "Construction", "Sales & Settlements", "Finance & Budget"];

const priCfg = {
  High:   { bg: "#FEE2E2", text: "#991B1B", dot: "#EF4444" },
  Medium: { bg: "#FEF3C7", text: "#92400E", dot: "#F59E0B" },
  Low:    { bg: "#ECFDF5", text: "#065F46", dot: "#10B981" },
};
const stsCfg = {
  "Not Started":       { bg: "#F3F4F6", text: "#6B7280" },
  "In Progress":       { bg: "#DBEAFE", text: "#1E40AF" },
  "Awaiting Response": { bg: "#FEF3C7", text: "#92400E" },
  "Completed":         { bg: "#D1FAE5", text: "#065F46" },
  "On Hold":           { bg: "#F3E8FF", text: "#6B21A8" },
};

const SECTION_META = [
  { id:"authorities",  title:"Authorities",          icon:"🏛", color:"#2D2D69" },
  { id:"legal",        title:"Legal",                icon:"⚖️", color:"#5B4FCF" },
  { id:"design",       title:"Design & Consultants", icon:"📐", color:"#0E6B5E" },
  { id:"sales",        title:"Sales & Marketing",    icon:"📣", color:"#E07B39" },
  { id:"construction", title:"Construction",         icon:"🏗", color:"#2D6A4F" },
  { id:"finance",      title:"Banking & Finance",    icon:"💰", color:"#B5451B" },
];

let _uid = 100;
const uid = () => String(++_uid);
const mkTask = (o={}) => ({ id:uid(), action:"", person:"SS", due:"", priority:"Medium", status:"Not Started", thisWeek:false, ...o });
const mkRow  = (label, name, comments, tasks) => ({ id:uid(), label, name:name||"", comments:comments||"", tasks:(tasks||[{}]).map(t=>mkTask(t)) });

function buildProjects() {
  return [

  // ── NANDROYA ──────────────────────────────────────────────────────────────
  { id:"nandroya", name:"Nandroya", color:"#0E7A6F", stage:"Planning & Approvals",
    purchaseDate:"", settlementDate:"2025-10-13",
    sections:{
      authorities:[
        mkRow("Council","Gold Coast City Council","DA Submitted 13/01/2026. RFI Responded 15/02/2026. 35 Business Days to respond. Due 03/04/2026.",[
          {action:"Monitor DA progress & prepare RFI response",person:"SS",priority:"High",status:"In Progress",thisWeek:true}]),
        mkRow("Electricity Authority","Energex","Confirmation on Upgrade of Isolator to PMT from PECE.",[
          {action:"Follow up PECE re isolator upgrade confirmation",person:"AL",priority:"High",status:"Awaiting Response",thisWeek:true,due:"2026-03-20"}]),
        mkRow("Water Authority","Gold Coast Water","",[{action:"",status:"Not Started"}]),
        mkRow("State Authority","","",[{action:"",status:"Not Started"}]),
        mkRow("Road Authority","","",[{action:"",status:"Not Started"}]),
      ],
      legal:[
        mkRow("Solicitor / Lawyer","Johanson Lawyers","Community Title Document underway.",[
          {action:"Progress Community Title Scheme document",person:"SS",priority:"Medium",status:"In Progress"}]),
        mkRow("Contracts","Johanson Lawyers","",[{action:"",status:"Not Started"}]),
        mkRow("Title & Searches","Johanson Lawyers","",[{action:"",status:"Not Started"}]),
      ],
      design:[
        mkRow("Architect","Stuart Osman – Osman Architects","SALT to review Detailed Design Documentation. Stuart to provide L Shape Kitchen by Wed 01/04. Stuart to provide all consultant quotes, steel install quote. Interiors – book meeting with Stu this week.",[
          {action:"Review Detailed Design Documentation",person:"AL/SS",priority:"High",status:"In Progress",thisWeek:true,due:"2026-03-14"},
          {action:"Book interiors meeting with Stuart Osman",person:"SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Obtain L Shape Kitchen design from Stuart (due 01/04)",person:"AL",priority:"High",status:"Not Started",due:"2026-04-01"},
        ]),
        mkRow("Town Planner","HPC Consulting – Murray Wright","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Civil Engineer","Jason – Legend Consulting","Detailed Design Submitted. RFI Response Submitted. Non-Approved Storm Water Filtration System – Awaiting Approval, if not approved update design.",[
          {action:"Confirm stormwater system approval status",person:"SS",priority:"High",status:"Awaiting Response",thisWeek:true}]),
        mkRow("Structural Engineer","Osmans","Building Structural Quotes tendered by Osmans. Retaining Wall Structural Quotes – To Engage.",[
          {action:"Review structural quotes from Osmans",person:"SS",priority:"Medium",status:"Not Started"},
          {action:"Engage structural engineer for retaining walls & get quotes",person:"SS",priority:"Medium",status:"Not Started"},
          {action:"SS to speak to Pete re structural eng",person:"SS",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("Electrical Engineer","Peter Eustace Consulting Engineers (PECE)","PECE to provide preliminary design timings & comments, new PMT confirmation, ECI pricing (internal & external breakdown). Send updated DD & civil package to PECE.",[
          {action:"Provide ECI pricing & PMT confirmation",person:"AL/SS",priority:"High",status:"Awaiting Response",thisWeek:true,due:"2026-03-20"},
          {action:"Send updated DD & civil package to PECE",person:"SS",priority:"High",status:"Not Started"},
        ]),
        mkRow("Hydraulic Engineer","Hydraulic Design Solutions","Design received – to be reviewed. Send to Jason for review.",[
          {action:"Review hydraulic design & send to Jason",person:"SS",priority:"Medium",status:"In Progress"}]),
        mkRow("Traffic & Waste","Jason – Legend Consulting","RFI Traffic Comments Addressed.",[
          {action:"Confirm final traffic sign-off",person:"SS",priority:"Low",status:"In Progress"}]),
        mkRow("Landscape Architect","I-Primus – Loren","RFI Comments Addressed.",[
          {action:"Confirm final landscape plan approval",person:"SS",priority:"Low",status:"Awaiting Response"}]),
        mkRow("Geotech","Protest Engineering","Report Updated Through RFI Process.",[
          {action:"No further action required",status:"Completed"}]),
        mkRow("Arborist","Heritage Tree Care – Tony","Review Arborist Report. Organise Tree Management Plan once DA is approved.",[
          {action:"Review arborist report",person:"SS",priority:"Low",status:"Not Started"},
          {action:"Organise Tree Management Plan (post DA approval)",person:"SS",priority:"Low",status:"Not Started"},
        ]),
        mkRow("Building Certifier","TBC","Review both quotes. Engage certifier. Recommendations on Mechanical, Fire Safety & additional items.",[
          {action:"Review certifier quotes & appoint",person:"SS",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("Mechanical Engineer","TBC","Certifier to confirm mechanical requirements.",[
          {action:"Await certifier confirmation on mechanical",person:"SS",priority:"Low",status:"Not Started"}]),
        mkRow("Energy Rater","TBC","Stuart Osman to provide Energy Rater Quote (timing & cost). Shannon recommendation to update quote – Thermal Assessments Australia (TAA).",[
          {action:"Obtain energy rater quote from Stuart Osman",person:"SS",priority:"Medium",status:"Not Started"},
          {action:"Get alternative quote from Thermal Assessments Australia",person:"SS",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("Survey","Andrew & Hanson","Proposed POS for Units (Disclosure Plan).",[
          {action:"Prepare disclosure plan / POS survey",person:"SS",priority:"Low",status:"Not Started"}]),
        mkRow("Bushfire Consultant","","No Action.",[{action:"No action required",status:"Completed"}]),
      ],
      sales:[
        mkRow("Sales","","1BD Sales Strategy. Rental Investments.",[
          {action:"Develop 1BD sales strategy & rental investment approach",person:"CB/SS",priority:"Medium",status:"Not Started"}]),
        mkRow("Digital Marketing","Ivy Street","",[{action:"",status:"Not Started"}]),
        mkRow("Physical Marketing","Engage","",[
          {action:"Prepare Investment Brochure",person:"SS",priority:"Medium",status:"Not Started"}]),
      ],
      construction:[
        mkRow("Civil Works","","BOQ (SS). Shannon to begin tendering. Back-up stormwater – timing & availability. Program (SS to build out over the fortnight). Sewer & Water – before built form or after? SS/AL to speak to Stuart.",[
          {action:"Complete BOQ",person:"SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Begin civil tendering process",person:"SS",priority:"High",status:"Not Started"},
          {action:"Build out construction programme",person:"SS",priority:"High",status:"Not Started"},
          {action:"Clarify sewer & water sequencing with Stuart",person:"SS/AL",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("Built Form","Stuart Osman / TBC","Tender Stuart & other options. Pricing breakdown / BOQ. Programme. Staged timings.",[
          {action:"Tender built form with Stuart Osman & alternatives",person:"SS",priority:"High",status:"Not Started"},
          {action:"Obtain pricing breakdown / BOQ",person:"SS",priority:"High",status:"Not Started"},
        ]),
        mkRow("Landscaping","",[{action:"",status:"Not Started"}]),
        mkRow("Defects","",[{action:"",status:"Not Started"}]),
      ],
      finance:[
        mkRow("Purchase Date","","",[{action:"",status:"Not Started"}]),
        mkRow("Settlement Date","","Settled 13th October 2025. Current Debt: $1.154m at 12%. 12 Month Term capitalised.",[{action:"Monitor debt repayment schedule",person:"CB",priority:"High",status:"In Progress"}]),
        mkRow("Hurdles","","Understand Build Cost, Civil Cost, Electrical Timing & Cost.",[
          {action:"Obtain build cost estimate",person:"CB/SS",priority:"High",status:"Not Started"},
          {action:"Confirm civil cost",person:"SS",priority:"High",status:"Not Started"},
          {action:"Confirm electrical timing & cost from PECE",person:"AL",priority:"High",status:"Not Started"},
        ]),
        mkRow("Accounting","","",[{action:"",status:"Not Started"}]),
        mkRow("PCG","","",[{action:"",status:"Not Started"}]),
        mkRow("Invoices","","",[{action:"",status:"Not Started"}]),
        mkRow("Feaso","","CB to send AL Feaso. AL to build new Feaso. Built Form $3,000/SQM & $4,000/SQM. Civil $1,500,000 + Electrical $500,000.",[
          {action:"CB to send current Feaso to AL",person:"CB",priority:"High",status:"Not Started",thisWeek:true},
          {action:"AL to build updated feasibility model",person:"AL",priority:"High",status:"Not Started"},
        ]),
        mkRow("Valuers","","",[{action:"",status:"Not Started"}]),
        mkRow("Debt","","Current Debt: $1.154m at 12%. Settled 13/10/2025. 12 Month Term capitalised.",[
          {action:"Monitor debt position",person:"CB",priority:"High",status:"In Progress"}]),
        mkRow("QS","","No Action.",[{action:"No action required",status:"Completed"}]),
      ],
    }
  },

  // ── MEADOWVIEW JIMBOOMBA ──────────────────────────────────────────────────
  { id:"jimboomba", name:"Meadowview Jimboomba", color:"#1B3A5C", stage:"Planning & Approvals",
    purchaseDate:"", settlementDate:"2025-03-17",
    sections:{
      authorities:[
        mkRow("Council","Logan City Council","Awaiting Operational Works. TP to submit Ecological Data / Email.",[
          {action:"Follow up LCC re OW status",person:"CS",priority:"High",status:"In Progress",thisWeek:true,due:"2026-03-30"},
          {action:"Submit ecological data email to council",person:"CS",priority:"High",status:"Not Started",thisWeek:true},
        ]),
        mkRow("Electricity Authority","Energex","PECE to submit with Energex – AL to check in.",[
          {action:"AL to check in on PECE submission to Energex",person:"AL",priority:"High",status:"In Progress",thisWeek:true,due:"2026-03-20"}]),
        mkRow("Water Authority","Logan Water","",[{action:"",status:"Not Started"}]),
        mkRow("State Authority","","",[{action:"",status:"Not Started"}]),
        mkRow("Road Authority","TMR","",[{action:"",status:"Not Started"}]),
      ],
      legal:[
        mkRow("Solicitor / Lawyer","Johanson Lawyers","",[{action:"",status:"Not Started"}]),
        mkRow("Contracts","Johanson Lawyers","",[{action:"",status:"Not Started"}]),
        mkRow("Title & Searches","","",[{action:"",status:"Not Started"}]),
      ],
      design:[
        mkRow("Survey","Andrew & Hanson","Proposed POS for Units (Disclosure Plan).",[
          {action:"Prepare disclosure plan / POS survey",person:"SS",priority:"Low",status:"Not Started"}]),
        mkRow("Electrical Engineer","Peter Eustace Consulting Engineers (PECE)","PECE to provide: preliminary design timings & comments, ECI pricing (internal & external), send updated DD & civil package to PECE.",[
          {action:"Provide preliminary design timings & ECI pricing",person:"AL/SS",priority:"High",status:"In Progress",thisWeek:true,due:"2026-03-20"}]),
        mkRow("Traffic & Waste","Jason – Legend Consulting","Road Closure Traffic Permits.",[
          {action:"Organise road closure traffic permits",person:"SS",priority:"Medium",status:"Not Started"}]),
        mkRow("Landscape Architect","I-Primus – Loren","No Action Items.",[{action:"No action required",status:"Completed"}]),
        mkRow("Civil Engineer","Jason – Legend Consulting","Detailed Design Submitted. RFI Response Submitted.",[
          {action:"Monitor civil design progress",person:"SS",priority:"Medium",status:"In Progress"}]),
        mkRow("Geotech","Protest Engineering","Test pits.",[
          {action:"Organise test pits",person:"SS",priority:"Medium",status:"Not Started"}]),
        mkRow("Arborist","QFC","Pre & Post Clearing Report.",[
          {action:"Arrange pre & post clearing report",person:"CB",priority:"Medium",status:"Not Started"}]),
        mkRow("Town Planner","Ultimate Planning Solutions – Chris Selton","Ecologist email to council. Offset recalculation.",[
          {action:"Send ecologist email to council",person:"CS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Complete offset recalculation",person:"CS",priority:"High",status:"Not Started"},
        ]),
        mkRow("Bushfire Consultant","","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Ecology","Ultimate Planning Solutions – Graham Dart","Review Offset Sites.",[
          {action:"Review offset sites",person:"SS",priority:"High",status:"In Progress"}]),
        mkRow("Fisheries","Aquatic Bio Passage – Andrew Berghuis","No Action.",[{action:"No action required",status:"Completed"}]),
      ],
      sales:[
        mkRow("Digital Marketing","","Coming Soon Page Ad. Billboard.",[
          {action:"Set up Coming Soon page ad",person:"SS",priority:"Medium",status:"Not Started"},
          {action:"Organise billboard",person:"SS",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("House Renovation","","Building Cleaner – 10/04. Painter (Robo's Handy Man) – booked, start 12/04. Tiler (Dexter) – need to organise, start 15/04. Electrical (T42 Fabian) – need to book 19/04. Plumbing (Josh Brown) – need to book 19/04. Tidy driveway & clean up rubbish 10-11/04.",[
          {action:"Book building cleaner for 10/04",person:"SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Confirm tiler Dexter for 15/04",person:"SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Book T42 Electrical Fabian for 19/04",person:"SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Book Josh Brown Plumbing for 19/04",person:"SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Tidy driveway & clean rubbish 10-11/04",person:"CB",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("Sales","","",[{action:"",status:"Not Started"}]),
        mkRow("Physical Marketing","","",[{action:"",status:"Not Started"}]),
      ],
      construction:[
        mkRow("Civil Works","Jason – Legend Consulting","BOQ received from Jason – SS to revise. Programme – SS to build out over fortnight. Dig Right to provide pricing. Sewer & water – before built form or after? SS/AL to speak to Stuart.",[
          {action:"Revise BOQ received from Jason",person:"SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Build out construction programme",person:"SS",priority:"High",status:"Not Started"},
          {action:"Obtain pricing from Dig Right",person:"SS",priority:"Medium",status:"Not Started"},
          {action:"Clarify sewer & water sequencing with Stuart",person:"SS/AL",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("Built Form","","",[{action:"",status:"Not Started"}]),
        mkRow("Landscaping","",[{action:"",status:"Not Started"}]),
        mkRow("Defects","",[{action:"",status:"Not Started"}]),
      ],
      finance:[
        mkRow("Purchase Date","","$2.8m Purchase Price. No Debt but owes Stockleigh.",[{action:"",status:"Not Started"}]),
        mkRow("Settlement Date","","Settled 17/03/2025.",[{action:"",status:"Not Started"}]),
        mkRow("Hurdles","","Offset Site.",[{action:"Progress offset site acquisition",person:"CB/SS",priority:"High",status:"In Progress"}]),
        mkRow("Accounting","","",[{action:"",status:"Not Started"}]),
        mkRow("PCG","","",[{action:"",status:"Not Started"}]),
        mkRow("Invoices","","",[{action:"",status:"Not Started"}]),
        mkRow("Feaso","","CB to send AL Feaso. AL to build new Feaso. $2.8m Purchase Price – No Debt but owes Stockleigh.",[
          {action:"CB to send current Feaso to AL",person:"CB",priority:"High",status:"Not Started"},
          {action:"AL to build updated feasibility model",person:"AL",priority:"High",status:"Not Started"},
        ]),
        mkRow("Valuers","Savills – Amy","Due next week 07/03. CS to follow up.",[
          {action:"Follow up Amy re valuation",person:"CS",priority:"High",status:"In Progress"}]),
        mkRow("Debt","","No Debt.",[{action:"No debt – no action",status:"Completed"}]),
        mkRow("QS","","No Action.",[{action:"No action required",status:"Completed"}]),
      ],
    }
  },

  // ── MEADOWVIEW STOCKLEIGH ─────────────────────────────────────────────────
  { id:"stockleigh", name:"Meadowview Stockleigh", color:"#C9A84C", stage:"Construction",
    purchaseDate:"", settlementDate:"2025-03-17",
    sections:{
      authorities:[
        mkRow("Council","Logan City Council","Landscape Bond Return 05/11/26 – $133,942.96.",[
          {action:"Monitor landscape bond return process",person:"CB",priority:"Medium",status:"In Progress"}]),
        mkRow("Electricity Authority","Energex","Bond Due this week – $30k.",[
          {action:"Pay Energex bond – $30k",person:"CB",priority:"High",status:"Not Started",thisWeek:true}]),
        mkRow("Water Authority","Logan Water","",[{action:"",status:"Not Started"}]),
        mkRow("State Authority","","",[{action:"",status:"Not Started"}]),
        mkRow("Road Authority","","",[{action:"",status:"Not Started"}]),
      ],
      legal:[
        mkRow("Solicitor / Lawyer","Johanson Lawyers","",[{action:"",status:"Not Started"}]),
        mkRow("Contracts","","",[{action:"",status:"Not Started"}]),
        mkRow("Title & Searches","","",[{action:"",status:"Not Started"}]),
      ],
      design:[
        mkRow("Survey","Andrew & Hanson","",[{action:"",status:"Not Started"}]),
        mkRow("Electrical Engineer","Peter Eustace Consulting Engineers (PECE)","Lightpole Repair East – cost repair.",[
          {action:"Organise lightpole repair (east side) – get cost",person:"SS",priority:"Medium",status:"Not Started",thisWeek:true}]),
        mkRow("Traffic & Waste","Jason – Legend Consulting","",[{action:"",status:"Not Started"}]),
        mkRow("Landscape Architect","I-Primus – Loren","Plant Street Trees 05/05/2026. Tender out works.",[
          {action:"Tender landscape works for street trees",person:"CB/SS",priority:"Medium",status:"Not Started",due:"2026-05-05"}]),
        mkRow("Civil Engineer","Jason – Legend Consulting","",[{action:"",status:"Not Started"}]),
        mkRow("Geotech","Protest Engineering","",[{action:"",status:"Not Started"}]),
        mkRow("Arborist","QFC","",[{action:"",status:"Not Started"}]),
        mkRow("Town Planner","Ultimate Planning Solutions – Chris Selton","",[{action:"",status:"Not Started"}]),
        mkRow("Bushfire Consultant","","",[{action:"",status:"Not Started"}]),
        mkRow("Ecology","Ultimate Planning Solutions – Graham Dart","Quarterly Maintenance Reports – Southern Cross Regen. Stay on top of them. Next Report April. Need to slash.",[
          {action:"Chase Southern Cross Regen re quarterly maintenance report (due April)",person:"CB",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Organise site slash",person:"CB",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("Fisheries","Aquatic Bio Passage – Andrew Berghuis","Follow up reporting – courtesy call.",[
          {action:"Courtesy call to Andrew re fisheries reporting",person:"SS",priority:"Low",status:"Not Started"}]),
      ],
      sales:[
        mkRow("Old House","","Paint Roof (get quotes). Install Driveway 10/04 – Pete & Mitch. Install Water Meter – Pete to complete application URGENT. Landscape – review yard and buy plants.",[
          {action:"Get quotes for roof painting",person:"SS",priority:"Medium",status:"Not Started",thisWeek:true},
          {action:"Confirm driveway install with Pete & Mitch for 10/04",person:"SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Pete to complete water meter application – URGENT",person:"SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Review yard & purchase landscaping plants",person:"SS",priority:"Low",status:"Not Started"},
        ]),
        mkRow("Whole Site","","Fencing – follow up for commitment. Laser Cut Entry Piece Sign (SS to arrange). Maintenance mow.",[
          {action:"Follow up fencing contractor commitment",person:"SS",priority:"Medium",status:"Not Started"},
          {action:"Arrange laser cut entry piece sign",person:"SS",priority:"Medium",status:"Not Started"},
          {action:"Organise maintenance mow",person:"SS",priority:"Low",status:"Not Started"},
        ]),
        mkRow("Digital Marketing","","",[{action:"",status:"Not Started"}]),
        mkRow("Physical Marketing","","",[{action:"",status:"Not Started"}]),
      ],
      construction:[
        mkRow("Civil Works","Jason – Legend Consulting","BOQ received from Jason – SS to revise. Programme – SS to build out over fortnight. Dig Right to provide pricing. Sewer & water sequencing TBC.",[
          {action:"Revise civil BOQ",person:"SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Build out construction programme",person:"SS",priority:"High",status:"Not Started"},
        ]),
        mkRow("Built Form","","",[{action:"",status:"Not Started"}]),
        mkRow("Landscaping","",[{action:"",status:"Not Started"}]),
        mkRow("Defects","",[{action:"",status:"Not Started"}]),
      ],
      finance:[
        mkRow("Purchase Date","","",[{action:"",status:"Not Started"}]),
        mkRow("Settlement Date","","Settled 17/03/2025. No Debt – equity release to fund Bonogin.",[{action:"Monitor equity release for Bonogin funding",person:"CB",priority:"Medium",status:"In Progress"}]),
        mkRow("Hurdles","","Offset Site.",[{action:"Progress offset site",person:"CB/SS",priority:"Medium",status:"In Progress"}]),
        mkRow("Accounting","","",[{action:"",status:"Not Started"}]),
        mkRow("PCG","","",[{action:"",status:"Not Started"}]),
        mkRow("Invoices","","",[{action:"",status:"Not Started"}]),
        mkRow("Feaso","","CB to send AL Feaso. AL to build new Feaso. $2.8m Purchase Price.",[
          {action:"CB to send Feaso to AL",person:"CB",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("Valuers","Savills – Amy","Due next week 07/03. CS to follow up.",[
          {action:"Follow up valuation with Amy",person:"CS",priority:"High",status:"In Progress"}]),
        mkRow("Debt","","No Debt. Equity release to fund Bonogin.",[{action:"No debt – monitor equity release",status:"Completed"}]),
        mkRow("QS","","No Action.",[{action:"No action required",status:"Completed"}]),
      ],
    }
  },

  // ── MUDGEERABA ────────────────────────────────────────────────────────────
  { id:"mudgeeraba", name:"Mudgeeraba", color:"#E07B39", stage:"Planning & Approvals",
    purchaseDate:"", settlementDate:"2024-10-01",
    sections:{
      authorities:[
        mkRow("Council","Gold Coast City Council","DA Submission Paused – Council Refusal. Afflux Issues outside tolerances. 30M Creek Buffer. Need to organise onsite council meeting.",[
          {action:"Organise onsite meeting with council",person:"CB/SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Address afflux issues & 30m creek buffer",person:"SS",priority:"High",status:"In Progress"},
        ]),
        mkRow("Electricity Authority","Energex","Awaiting DA.",[{action:"Awaiting DA approval",status:"On Hold"}]),
        mkRow("Water Authority","Logan Water","Awaiting DA.",[{action:"Awaiting DA approval",status:"On Hold"}]),
        mkRow("Road Authority","TMR","RFI Response Submitted 17/03/2026. Response due 17/04/2026.",[
          {action:"Monitor TMR RFI response – due 17/04/2026",person:"SS",priority:"High",status:"Awaiting Response",due:"2026-04-17"}]),
        mkRow("State Authority","","",[{action:"",status:"Not Started"}]),
      ],
      legal:[
        mkRow("Solicitor / Lawyer","Johanson Lawyers","Community Title Scheme.",[
          {action:"Progress Community Title Scheme",person:"SS",priority:"Medium",status:"In Progress"}]),
        mkRow("Contracts","","",[{action:"",status:"Not Started"}]),
        mkRow("Title & Searches","","",[{action:"",status:"Not Started"}]),
      ],
      design:[
        mkRow("Survey","Andrew & Hanson","Proposed POS for Units (Disclosure Plan).",[
          {action:"Prepare disclosure plan survey",person:"SS",priority:"Low",status:"Not Started"}]),
        mkRow("Electrical Engineer","Peter Eustace Consulting Engineers (PECE)","Preliminary Design to be stopped. PECE to provide preliminary design comments and ECI pricing.",[
          {action:"Instruct PECE to pause preliminary design",person:"AL/SS",priority:"High",status:"Not Started",thisWeek:true,due:"2026-03-20"}]),
        mkRow("Traffic & Waste","Jason – Legend Consulting","No Action Items.",[{action:"No action required",status:"Completed"}]),
        mkRow("Landscape Architect","I-Primus – Loren","Review RFI Response & redesign landscape. Look into tiered retaining wall option based on TMR response.",[
          {action:"Review RFI response & redesign landscape with tiered retaining wall option",person:"SS",priority:"High",status:"In Progress"}]),
        mkRow("Civil Engineer","Jason – Legend Consulting","Afflux recalculation & solution – 31/03. 30m Buffer Zone – seeking relaxation, no action.",[
          {action:"Afflux recalculation & engineering solution",person:"SS",priority:"High",status:"In Progress",due:"2026-03-31"}]),
        mkRow("Geotech","Protest Engineering","",[{action:"",status:"Not Started"}]),
        mkRow("Arborist","QFC","Pre & Post Clearing Report.",[
          {action:"Arrange pre & post clearing report",person:"CB",priority:"Medium",status:"Not Started"}]),
        mkRow("Town Planner","Ultimate Planning Solutions – Chris Selton","Understand additional reports that can assist case – e.g. ecology to support 30m offset.",[
          {action:"Identify additional supporting reports for council case",person:"CS",priority:"High",status:"In Progress"}]),
        mkRow("Bushfire Consultant","","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Ecology","Ultimate Planning Solutions – Graham Dart","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Fisheries","Aquatic Bio Passage – Andrew Berghuis","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Acoustic","Palmer Acoustic – Javier Navas","TMR RFI – Management.",[
          {action:"Manage TMR RFI acoustic response",person:"SS",priority:"High",status:"In Progress"}]),
      ],
      sales:[
        mkRow("House Relocation","CB – David Wright House Relocators","David Wright – House relocators.",[
          {action:"Engage David Wright re house relocation",person:"CB",priority:"High",status:"Not Started",thisWeek:true}]),
        mkRow("Digital Marketing","","",[{action:"",status:"Not Started"}]),
        mkRow("Physical Marketing","","",[{action:"",status:"Not Started"}]),
        mkRow("Sales","","",[{action:"",status:"Not Started"}]),
      ],
      construction:[
        mkRow("Civil Works","","",[{action:"",status:"Not Started"}]),
        mkRow("Built Form","","",[{action:"",status:"Not Started"}]),
        mkRow("Landscaping","",[{action:"",status:"Not Started"}]),
        mkRow("Defects","",[{action:"",status:"Not Started"}]),
      ],
      finance:[
        mkRow("Purchase Date","","",[{action:"",status:"Not Started"}]),
        mkRow("Settlement Date","","Settled 01/10/2024. $2.275m – 9% – Dave – 100% – 2yr cap.",[{action:"Monitor debt position",person:"CB",priority:"Medium",status:"In Progress"}]),
        mkRow("Hurdles","","DA Approval.",[{action:"Progress DA through council issues",person:"CB/SS",priority:"High",status:"In Progress"}]),
        mkRow("Accounting","","",[{action:"",status:"Not Started"}]),
        mkRow("PCG","","",[{action:"",status:"Not Started"}]),
        mkRow("Invoices","","",[{action:"",status:"Not Started"}]),
        mkRow("Feaso","","CB to send AL Feaso. AL to build new Feaso. $2.275m – 9% – Dave – 100% – 2yr cap.",[
          {action:"CB to send Feaso to AL",person:"CB",priority:"Medium",status:"Not Started"},
          {action:"AL to build updated feasibility model",person:"AL",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("Valuers","","",[{action:"",status:"Not Started"}]),
        mkRow("Debt","","",[{action:"",status:"Not Started"}]),
        mkRow("QS","","No Action.",[{action:"No action required",status:"Completed"}]),
      ],
    }
  },

  // ── BONOGIN VALLEY ESTATE ─────────────────────────────────────────────────
  { id:"bonogin", name:"Bonogin Valley Estate", color:"#2D6A4F", stage:"Planning & Approvals",
    purchaseDate:"2025-12-16", settlementDate:"2026-06-26",
    sections:{
      authorities:[
        mkRow("Council","Gold Coast City Council","DA Submission this week.",[
          {action:"Lodge DA this week",person:"SS",priority:"High",status:"Not Started",thisWeek:true}]),
        mkRow("Electricity Authority","Energex","Awaiting DA.",[{action:"Awaiting DA lodgement",status:"On Hold"}]),
        mkRow("Water Authority","Gold Coast City Water","Awaiting DA.",[{action:"Awaiting DA lodgement",status:"On Hold"}]),
        mkRow("Road Authority","TMR","",[{action:"",status:"Not Started"}]),
        mkRow("State Authority","","",[{action:"",status:"Not Started"}]),
      ],
      legal:[
        mkRow("Solicitor / Lawyer","Johanson Lawyers","Send DA Package. Contract Void Date 08/04/2026.",[
          {action:"Send DA package to Johanson Lawyers",person:"SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Monitor contract void date 08/04/2026",person:"CB",priority:"High",status:"In Progress",due:"2026-04-08"},
        ]),
        mkRow("Contracts","","",[{action:"",status:"Not Started"}]),
        mkRow("Title & Searches","","",[{action:"",status:"Not Started"}]),
      ],
      design:[
        mkRow("Survey","Andrew & Hanson","Proposed POS for Units (Disclosure Plan).",[
          {action:"Prepare disclosure plan survey",person:"SS",priority:"Low",status:"Not Started"}]),
        mkRow("Electrical Engineer","Peter Eustace Consulting Engineers (PECE)","",[ {action:"",person:"AL/SS",status:"Not Started",due:"2026-03-20"}]),
        mkRow("Traffic & Waste","Jason – Legend Consulting","No Action Items.",[{action:"No action required",status:"Completed"}]),
        mkRow("Landscape Architect","I-Primus – Loren","Awaiting Package – 30/01.",[
          {action:"Follow up landscape package",person:"SS",priority:"Medium",status:"Awaiting Response"}]),
        mkRow("Civil Engineer","Jason – Legend Consulting","Awaiting Civil Design – 30/01.",[
          {action:"Follow up civil design from Jason",person:"SS",priority:"High",status:"Awaiting Response"}]),
        mkRow("Geotech","Protest Engineering","Landslide Report Complete.",[{action:"No further action",status:"Completed"}]),
        mkRow("Arborist","QFC","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Town Planner","HPC Consulting – Murray Wright","Preparation of DA Package.",[
          {action:"Finalise & lodge DA package",person:"SS",priority:"High",status:"In Progress",thisWeek:true}]),
        mkRow("Bushfire Consultant","","Awaiting Report – 30/01.",[
          {action:"Follow up bushfire report",person:"SS",priority:"High",status:"Awaiting Response"}]),
        mkRow("Ecology","Ultimate Planning Solutions – Graham Dart","Reports complete for DA.",[{action:"Ecology reports ready – no further action",status:"Completed"}]),
        mkRow("Fisheries","","",[{action:"",status:"Not Started"}]),
      ],
      sales:[
        mkRow("Marketing","","Engage Graya. Full Marketing Package.",[
          {action:"Engage Graya for full marketing package",person:"CB/SS",priority:"Medium",status:"Not Started"}]),
        mkRow("Digital Marketing","","",[{action:"",status:"Not Started"}]),
        mkRow("Physical Marketing","","",[{action:"",status:"Not Started"}]),
        mkRow("Sales","","",[{action:"",status:"Not Started"}]),
      ],
      construction:[
        mkRow("Civil Works","","",[{action:"",status:"Not Started"}]),
        mkRow("Built Form","","",[{action:"",status:"Not Started"}]),
        mkRow("Landscaping","",[{action:"",status:"Not Started"}]),
        mkRow("Defects","",[{action:"",status:"Not Started"}]),
      ],
      finance:[
        mkRow("Purchase Date","","Purchased 16/12/2025. Only paid deposit. $5,555,000 + $300k per lot over 14 lots.",[{action:"Monitor contract & settlement obligations",person:"CB",priority:"High",status:"In Progress"}]),
        mkRow("Settlement Date","","Settlement due 26/06/2026.",[{action:"Prepare for settlement 26/06/2026",person:"CB",priority:"High",status:"In Progress",due:"2026-06-26"}]),
        mkRow("Hurdles","","DA Approval.",[{action:"Progress DA lodgement",person:"CB/SS",priority:"High",status:"In Progress"}]),
        mkRow("Accounting","","",[{action:"",status:"Not Started"}]),
        mkRow("PCG","","",[{action:"",status:"Not Started"}]),
        mkRow("Invoices","","",[{action:"",status:"Not Started"}]),
        mkRow("Feaso","","CB to send AL Feaso. AL to build new Feaso. $5,555,000 + $300k per lot over 14 lots – only paid deposit.",[
          {action:"CB to send Feaso to AL",person:"CB",priority:"High",status:"Not Started",thisWeek:true},
          {action:"AL to build feasibility model",person:"AL",priority:"High",status:"Not Started"},
        ]),
        mkRow("Valuers","","",[{action:"",status:"Not Started"}]),
        mkRow("Debt","","",[{action:"",status:"Not Started"}]),
        mkRow("QS","","",[{action:"",status:"Not Started"}]),
      ],
    }
  },

  // ── GOONELLABAH ───────────────────────────────────────────────────────────
  { id:"goonellabah", name:"Goonellabah", color:"#5B4FCF", stage:"Planning & Approvals",
    purchaseDate:"", settlementDate:"2024-08-23",
    sections:{
      authorities:[
        mkRow("Council","Lismore City Council","Awaiting Minor Change Modification. Public Notice finished 25/03. Response expected 10/03 latest. Surplus land to be included in future urban footprint (Draft Urban Plan). Expected date 14/04/2026.",[
          {action:"Monitor minor change modification response",person:"SS",priority:"High",status:"Awaiting Response",due:"2026-04-14",thisWeek:true},
          {action:"Monitor draft urban plan inclusion – expected 14/04/2026",person:"CB",priority:"High",status:"Awaiting Response",due:"2026-04-14"},
        ]),
        mkRow("Electricity Authority","Essential Energy","Awaiting DA.",[{action:"Awaiting DA",status:"On Hold"}]),
        mkRow("Water Authority","Gold Coast City Water","Awaiting DA.",[{action:"Awaiting DA",status:"On Hold"}]),
        mkRow("Road Authority","TMR","",[{action:"",status:"Not Started"}]),
        mkRow("State Authority","","",[{action:"",status:"Not Started"}]),
      ],
      legal:[
        mkRow("Solicitor / Lawyer","Johanson Lawyers","",[{action:"",status:"Not Started"}]),
        mkRow("Contracts","","",[{action:"",status:"Not Started"}]),
        mkRow("Title & Searches","","",[{action:"",status:"Not Started"}]),
      ],
      design:[
        mkRow("Survey","Andrew & Hanson","Locate Sewer Manhole.",[
          {action:"Locate sewer manhole",person:"SS",priority:"Medium",status:"Not Started"}]),
        mkRow("Electrical Engineer","Peter Eustace Consulting Engineers (PECE)","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Traffic & Waste","Jason – Legend Consulting","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Landscape Architect","I-Primus – Loren","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Civil Engineer","Jason – Legend Consulting","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Geotech","Protest Engineering","Geotech Investigation.",[
          {action:"Organise geotech investigation",person:"SS",priority:"Medium",status:"Not Started"}]),
        mkRow("Arborist","QFC","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Town Planner","HPC Consulting – Murray Wright","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Bushfire Consultant","","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Ecology","Ultimate Planning Solutions – Graham Dart","No Action.",[{action:"No action required",status:"Completed"}]),
      ],
      sales:[
        mkRow("Marketing","","Off Market Sale Campaign – finishes 02/04.",[
          {action:"Monitor off market sale campaign – ends 02/04",person:"CB",priority:"High",status:"In Progress",due:"2026-04-02",thisWeek:true}]),
        mkRow("Digital Marketing","","",[{action:"",status:"Not Started"}]),
        mkRow("Physical Marketing","","",[{action:"",status:"Not Started"}]),
        mkRow("Sales","","",[{action:"",status:"Not Started"}]),
      ],
      construction:[
        mkRow("Civil Works","","",[{action:"",status:"Not Started"}]),
        mkRow("Built Form","","",[{action:"",status:"Not Started"}]),
        mkRow("Landscaping","",[{action:"",status:"Not Started"}]),
        mkRow("Defects","",[{action:"",status:"Not Started"}]),
      ],
      finance:[
        mkRow("Purchase Date","","",[{action:"",status:"Not Started"}]),
        mkRow("Settlement Date","","Settled 23/08/2024. $2,000,000 – 12% – 2yr Term – Dave 100%.",[{action:"Monitor debt repayment",person:"CB",priority:"Medium",status:"In Progress"}]),
        mkRow("Hurdles","","Draft Urban Plan Inclusion. Valuation. Off Market Sale Campaign.",[
          {action:"Monitor draft urban plan inclusion progress",person:"CB",priority:"High",status:"In Progress"},
        ]),
        mkRow("Accounting","","",[{action:"",status:"Not Started"}]),
        mkRow("PCG","","",[{action:"",status:"Not Started"}]),
        mkRow("Invoices","","",[{action:"",status:"Not Started"}]),
        mkRow("Feaso","","CB to send AL Feaso. $2,000,000 – 12% – 2yr Term – Dave 100%.",[
          {action:"CB to send Feaso to AL",person:"CB",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("Valuers","Charter Kremer","50% Valuation 17/04. Full Valuation 5 days later.",[
          {action:"Confirm 50% valuation appointment for 17/04",person:"CB",priority:"High",status:"Not Started",due:"2026-04-17",thisWeek:true},
        ]),
        mkRow("Debt","","",[{action:"",status:"Not Started"}]),
        mkRow("QS","","",[{action:"",status:"Not Started"}]),
      ],
    }
  },

  // ── BILAMBIL ──────────────────────────────────────────────────────────────
  { id:"bilambil", name:"Bilambil", color:"#B5451B", stage:"Planning & Approvals",
    purchaseDate:"", settlementDate:"2022-03-02",
    sections:{
      authorities:[
        mkRow("Council","Tweed City Council","Modification Submission. Waiting on council to provide invoice. Documentation Submitted 12/03/2026.",[
          {action:"Follow up Tweed Council re modification invoice",person:"SS",priority:"High",status:"Awaiting Response",thisWeek:true}]),
        mkRow("Electricity Authority","Essential Energy","",[{action:"",status:"Not Started"}]),
        mkRow("Water Authority","Tweed Water","",[{action:"",status:"Not Started"}]),
        mkRow("Road Authority","TMR","",[{action:"",status:"Not Started"}]),
        mkRow("State Authority","","",[{action:"",status:"Not Started"}]),
      ],
      legal:[
        mkRow("Solicitor / Lawyer","Johanson Lawyers","Community Title Scheme.",[
          {action:"Progress Community Title Scheme",person:"SS",priority:"Medium",status:"In Progress"}]),
        mkRow("Contracts","","",[{action:"",status:"Not Started"}]),
        mkRow("Title & Searches","","",[{action:"",status:"Not Started"}]),
      ],
      design:[
        mkRow("Survey","Andrew & Hanson","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Electrical Engineer","Peter Eustace Consulting Engineers (PECE)","CB/AL to follow up and check design submission. Design Completed. Timing.",[
          {action:"Follow up PECE re design submission timing",person:"AL",priority:"High",status:"In Progress",thisWeek:true,due:"2026-03-20"},
        ]),
        mkRow("Traffic & Waste","Jason – Legend Consulting","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Landscape Architect","I-Primus – Loren","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Civil Engineer","Jason – Legend Consulting","Lodge CC once modification is approved. Design Complete.",[
          {action:"Lodge Construction Certificate once modification approved",person:"SS",priority:"High",status:"On Hold"}]),
        mkRow("Geotech","Protest Engineering","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Arborist","QFC","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Town Planner","Ultimate Planning Solutions – Chris Selton","Modification Lodgement Follow Up.",[
          {action:"Follow up modification lodgement status",person:"CS",priority:"High",status:"In Progress",thisWeek:true}]),
        mkRow("Bushfire Consultant","","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Ecology","Ultimate Planning Solutions – Graham Dart","No Action.",[{action:"No action required",status:"Completed"}]),
      ],
      sales:[
        mkRow("Digital Marketing","","",[{action:"",status:"Not Started"}]),
        mkRow("Physical Marketing","","",[{action:"",status:"Not Started"}]),
        mkRow("Sales","","",[{action:"",status:"Not Started"}]),
      ],
      construction:[
        mkRow("Civil Works","","Awaiting CC Approval.",[{action:"Awaiting CC approval before proceeding",status:"On Hold"}]),
        mkRow("Built Form","","",[{action:"",status:"Not Started"}]),
        mkRow("Landscaping","",[{action:"",status:"Not Started"}]),
        mkRow("Defects","",[{action:"",status:"Not Started"}]),
      ],
      finance:[
        mkRow("Purchase Date","","",[{action:"",status:"Not Started"}]),
        mkRow("Settlement Date","","Settled 02/03/2022. $2,000,000 – 10%. $600k Ivette @10%. $1,400,000 @7%.",[{action:"Monitor debt structure",person:"CB",priority:"Medium",status:"In Progress"}]),
        mkRow("Hurdles","","Modification Approval.",[{action:"Progress modification approval",person:"CB/SS",priority:"High",status:"In Progress"}]),
        mkRow("Accounting","","",[{action:"",status:"Not Started"}]),
        mkRow("PCG","","",[{action:"",status:"Not Started"}]),
        mkRow("Invoices","","",[{action:"",status:"Not Started"}]),
        mkRow("Feaso","","CB to send AL Feaso. $2,000,000 – 10%. $600k Ivette @10%. $1,400,000 @7%.",[
          {action:"CB to send Feaso to AL",person:"CB",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("Valuers","Charter Kremer","",[{action:"",status:"Not Started"}]),
        mkRow("Debt","","$1,400,000 @7% – Ivette Servicing Loan.",[{action:"Monitor Ivette servicing loan",person:"CB",priority:"Medium",status:"In Progress"}]),
        mkRow("QS","","",[{action:"",status:"Not Started"}]),
      ],
    }
  },

  // ── DAVE – CANUNGRA ───────────────────────────────────────────────────────
  { id:"canungra", name:"Canungra – Dave", color:"#7B5EA7", stage:"Land Acquisition",
    purchaseDate:"", settlementDate:"",
    sections:{
      authorities:[
        mkRow("Council","Scenic Rim Council","",[{action:"",status:"Not Started"}]),
        mkRow("Electricity Authority","Essential Energy","",[{action:"",status:"Not Started"}]),
        mkRow("Water Authority","Tweed Water","",[{action:"",status:"Not Started"}]),
        mkRow("Road Authority","TMR","",[{action:"",status:"Not Started"}]),
        mkRow("Federal Authority","Federal","",[{action:"",status:"Not Started"}]),
      ],
      legal:[
        mkRow("Solicitor / Lawyer","Johanson Lawyers","",[{action:"",status:"Not Started"}]),
        mkRow("Contracts","","",[{action:"",status:"Not Started"}]),
        mkRow("Title & Searches","","",[{action:"",status:"Not Started"}]),
      ],
      design:[
        mkRow("Survey","Andrew & Hanson","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Electrical Engineer","Peter Eustace Consulting Engineers (PECE)","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Traffic & Waste","Jason – Legend Consulting","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Landscape Architect","I-Primus – Loren","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Civil Engineer","Jason – Legend Consulting","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Geotech","Protest Engineering","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Arborist","QFC","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Town Planner","Ultimate Planning Solutions – Chris Selton","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Bushfire Consultant","","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Ecology","Ultimate Planning Solutions – Graham Dart","No Action.",[{action:"No action required",status:"Completed"}]),
      ],
      sales:[
        mkRow("Digital Marketing","","",[{action:"",status:"Not Started"}]),
        mkRow("Physical Marketing","","",[{action:"",status:"Not Started"}]),
        mkRow("Sales","","",[{action:"",status:"Not Started"}]),
      ],
      construction:[
        mkRow("Civil Works","","",[{action:"",status:"Not Started"}]),
        mkRow("Built Form","","",[{action:"",status:"Not Started"}]),
        mkRow("Landscaping","",[{action:"",status:"Not Started"}]),
        mkRow("Defects","",[{action:"",status:"Not Started"}]),
      ],
      finance:[
        mkRow("Purchase Date","","",[{action:"",status:"Not Started"}]),
        mkRow("Settlement Date","","Settlement date TBC.",[{action:"Confirm settlement date with Dave",person:"CB",priority:"Medium",status:"Not Started"}]),
        mkRow("Hurdles","","",[{action:"",status:"Not Started"}]),
        mkRow("Accounting","","",[{action:"",status:"Not Started"}]),
        mkRow("PCG","","",[{action:"",status:"Not Started"}]),
        mkRow("Invoices","","",[{action:"",status:"Not Started"}]),
        mkRow("Feaso","","Run Dave through Feaso.",[
          {action:"Run Canungra through feasibility model",person:"CB/AL",priority:"Medium",status:"Not Started"}]),
        mkRow("Valuers","Charter Kremer","",[{action:"",status:"Not Started"}]),
        mkRow("Debt","","",[{action:"",status:"Not Started"}]),
        mkRow("QS","","",[{action:"",status:"Not Started"}]),
      ],
    }
  },

  ]; // end projects
}
// ─── Utilities ────────────────────────────────────────────────────────────────
function getWeekRange() {
  const t=new Date(), day=t.getDay();
  const mon=new Date(t); mon.setDate(t.getDate()-(day===0?6:day-1));
  const fri=new Date(mon); fri.setDate(mon.getDate()+4);
  const f=d=>d.toLocaleDateString("en-AU",{day:"numeric",month:"short"});
  return `${f(mon)} – ${f(fri)}, ${fri.getFullYear()}`;
}
function fmtDate(s){if(!s)return"";const d=new Date(s);return isNaN(d)?s:d.toLocaleDateString("en-AU",{day:"numeric",month:"short",year:"numeric"});}

// ─── Atoms ────────────────────────────────────────────────────────────────────
function Badge({label,cfg,small}){
  return(
    <span style={{display:"inline-flex",alignItems:"center",gap:3,padding:small?"2px 7px":"3px 10px",borderRadius:20,fontSize:small?10:11,fontWeight:600,background:cfg.bg,color:cfg.text,whiteSpace:"nowrap"}}>
      {cfg.dot&&<span style={{width:5,height:5,borderRadius:"50%",background:cfg.dot,flexShrink:0}}/>}{label}
    </span>
  );
}

// ─── Task Row ─────────────────────────────────────────────────────────────────
function TaskRow({task,onUpdate,onDelete,onToggleWeek,onToggleComplete,isOnly}){
  const[editing,setEditing]=useState(false);
  const[draft,setDraft]=useState(task);
  const done=task.status==="Completed";
  const has=task.action?.trim();
  const save=()=>{onUpdate(draft);setEditing(false);};
  return(
    <div style={{display:"flex",alignItems:"flex-start",gap:8,padding:"7px 0",borderBottom:"1px dashed #F0F0F0",background:task.thisWeek?"#EEF6FF":"transparent"}}>
      <button onClick={onToggleComplete} style={{flexShrink:0,marginTop:3,width:15,height:15,borderRadius:3,padding:0,cursor:"pointer",border:`2px solid ${done?"#10B981":"#D1D5DB"}`,background:done?"#10B981":"white",display:"flex",alignItems:"center",justifyContent:"center"}}>
        {done&&<span style={{color:"white",fontSize:8,fontWeight:900,lineHeight:1}}>✓</span>}
      </button>
      {editing?(
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:6}}>
          <textarea value={draft.action} onChange={e=>setDraft(d=>({...d,action:e.target.value}))} placeholder="Action required..." rows={2}
            style={{fontSize:12,border:"1px solid #E5E7EB",borderRadius:5,padding:"5px 8px",outline:"none",resize:"vertical",fontFamily:"sans-serif",width:"100%",boxSizing:"border-box"}}/>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            <select value={draft.person} onChange={e=>setDraft(d=>({...d,person:e.target.value}))}
              style={{fontSize:11,border:"1px solid #E5E7EB",borderRadius:4,padding:"3px 6px",outline:"none",fontFamily:"sans-serif"}}>
              {PERSON_LIST.map(p=><option key={p.id} value={p.id}>{p.label}</option>)}
            </select>
            {[["priority",PRIORITIES],["status",STATUSES]].map(([field,opts])=>(
              <select key={field} value={draft[field]} onChange={e=>{const v=e.target.value;setDraft(d=>({...d,[field]:v}));}}
                style={{fontSize:11,border:"1px solid #E5E7EB",borderRadius:4,padding:"3px 6px",outline:"none",fontFamily:"sans-serif"}}>
                {opts.map(o=><option key={o}>{o}</option>)}
              </select>
            ))}
            <input type="date" value={draft.due||""} onChange={e=>setDraft(d=>({...d,due:e.target.value}))}
              style={{fontSize:11,border:"1px solid #E5E7EB",borderRadius:4,padding:"3px 6px",outline:"none"}}/>
            <label style={{fontSize:11,display:"flex",alignItems:"center",gap:4,cursor:"pointer",fontFamily:"sans-serif"}}>
              <input type="checkbox" checked={draft.thisWeek} onChange={e=>setDraft(d=>({...d,thisWeek:e.target.checked}))}/>This Week
            </label>
          </div>
          <div style={{display:"flex",gap:6}}>
            <button onClick={()=>{setDraft(task);setEditing(false);}} style={{padding:"3px 10px",borderRadius:5,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"sans-serif",background:"none",border:"1px solid #E5E7EB",color:"#6B7280"}}>Cancel</button>
            <button onClick={save} style={{padding:"3px 10px",borderRadius:5,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"sans-serif",background:INDIGO,border:"none",color:"white"}}>Save</button>
          </div>
        </div>
      ):(
        <div style={{flex:1,minWidth:0}}>
          {has?(
            <>
              <div style={{fontSize:12,color:done?"#9CA3AF":"#1F2937",textDecoration:done?"line-through":"none",lineHeight:1.4,marginBottom:4}}>{task.action}</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap",alignItems:"center"}}>
                <span style={{fontSize:10,fontWeight:700,color:INDIGO}}>@{PERSON_LIST.find(p=>p.id===task.person)?.label||task.person}</span>
                {task.due&&<span style={{fontSize:10,color:"#9CA3AF"}}>· {fmtDate(task.due)}</span>}
                <Badge label={task.priority} cfg={priCfg[task.priority]||priCfg.Medium} small/>
                <Badge label={task.status} cfg={stsCfg[task.status]||stsCfg["Not Started"]} small/>
              </div>
            </>
          ):<span style={{fontSize:11,color:"#CBD5E1",fontStyle:"italic"}}>No action — click Edit to add</span>}
        </div>
      )}
      {!editing&&(
        <div style={{display:"flex",gap:4,flexShrink:0,alignItems:"center"}}>
          <button onClick={onToggleWeek} style={{padding:"2px 7px",borderRadius:20,fontSize:10,fontWeight:700,cursor:"pointer",border:`1.5px solid ${task.thisWeek?SKY:"#E5E7EB"}`,background:task.thisWeek?SKY_LT:"white",color:task.thisWeek?"#1E3A5F":"#CBD5E1"}}>
            {task.thisWeek?"★":"☆"}
          </button>
          <button onClick={()=>{setDraft(task);setEditing(true);}} style={{padding:"3px 10px",borderRadius:5,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"sans-serif",background:"none",border:"1px solid #E5E7EB",color:"#6B7280"}}>Edit</button>
          {!isOnly&&<button onClick={onDelete} style={{padding:"3px 10px",borderRadius:5,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"sans-serif",background:"#FEF2F2",border:"1px solid #FCA5A5",color:"#991B1B"}}>✕</button>}
        </div>
      )}
    </div>
  );
}

// ─── Consultant Block ─────────────────────────────────────────────────────────
function ConsultantBlock({c,secColor,onUpdate,onAddTask,onUpdateTask,onDeleteTask,onToggleWeek,onToggleComplete,onDelete}){
  const[editMeta,setEditMeta]=useState(false);
  const[meta,setMeta]=useState({label:c.label,name:c.name,comments:c.comments});
  const twk=c.tasks.filter(t=>t.thisWeek).length;
  const saveMeta=()=>{onUpdate({...c,...meta});setEditMeta(false);};
  return(
    <div style={{display:"grid",gridTemplateColumns:"190px 1fr 1fr",borderBottom:"1px solid #EEF0F3",background:twk>0?"#EEF6FF":"white",minHeight:52}}>
      {/* COL 1: Consultant */}
      <div style={{padding:"10px 12px",borderRight:"1px solid #EEF0F3",background:twk>0?"#E3F0FF":"#FAFBFC",display:"flex",flexDirection:"column",justifyContent:"flex-start",gap:4}}>
        {editMeta?(
          <>
            <input value={meta.label} onChange={e=>setMeta(d=>({...d,label:e.target.value}))} placeholder="Role/type"
              style={{fontSize:11,fontWeight:700,color:secColor,border:"1px solid #E5E7EB",borderRadius:4,padding:"2px 6px",outline:"none",width:"100%",boxSizing:"border-box"}}/>
            <input value={meta.name} onChange={e=>setMeta(d=>({...d,name:e.target.value}))} placeholder="Firm/contact"
              style={{fontSize:11,border:"1px solid #E5E7EB",borderRadius:4,padding:"2px 6px",outline:"none",width:"100%",boxSizing:"border-box"}}/>
            <div style={{display:"flex",gap:4,marginTop:2}}>
              <button onClick={()=>setEditMeta(false)} style={{padding:"3px 10px",borderRadius:5,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"sans-serif",background:"none",border:"1px solid #E5E7EB",color:"#6B7280"}}>Cancel</button>
              <button onClick={saveMeta} style={{padding:"3px 10px",borderRadius:5,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"sans-serif",background:INDIGO,border:"none",color:"white"}}>Save</button>
            </div>
          </>
        ):(
          <>
            <div style={{fontSize:11,fontWeight:700,color:secColor,textTransform:"uppercase",letterSpacing:"0.04em",lineHeight:1.2}}>{c.label}</div>
            <div style={{fontSize:11,color:"#6B7280",fontStyle:c.name?"normal":"italic"}}>{c.name||"—"}</div>
            <div style={{display:"flex",gap:4,marginTop:3,flexWrap:"wrap"}}>
              <button onClick={()=>{setMeta({label:c.label,name:c.name,comments:c.comments});setEditMeta(true);}} style={{padding:"3px 10px",borderRadius:5,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"sans-serif",background:"none",border:"1px solid #E5E7EB",color:"#6B7280"}}>✏️ Edit</button>
              <button onClick={onDelete} style={{padding:"3px 10px",borderRadius:5,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"sans-serif",background:"#FEF2F2",border:"1px solid #FCA5A5",color:"#991B1B"}}>Remove</button>
            </div>
            {twk>0&&<span style={{fontSize:9,background:SKY,color:"white",padding:"1px 6px",borderRadius:20,fontWeight:700,alignSelf:"flex-start",marginTop:2}}>★ {twk} this week</span>}
          </>
        )}
      </div>
      {/* COL 2: General Comments */}
      <div style={{padding:"10px 12px",borderRight:"1px solid #EEF0F3"}}>
        {editMeta?(
          <textarea value={meta.comments} onChange={e=>setMeta(d=>({...d,comments:e.target.value}))} placeholder="General comments, status notes, background info..." rows={4}
            style={{fontSize:11,border:"1px solid #E5E7EB",borderRadius:4,padding:"4px 7px",outline:"none",resize:"vertical",fontFamily:"sans-serif",width:"100%",boxSizing:"border-box",color:"#4B5563"}}/>
        ):c.comments?(
          <div style={{fontSize:11,color:"#4B5563",lineHeight:1.55,whiteSpace:"pre-wrap",cursor:"pointer"}} onClick={()=>{setMeta({label:c.label,name:c.name,comments:c.comments});setEditMeta(true);}}>{c.comments}</div>
        ):(
          <div style={{fontSize:11,color:"#E2E8F0",fontStyle:"italic",cursor:"pointer"}} onClick={()=>{setMeta({label:c.label,name:c.name,comments:c.comments});setEditMeta(true);}}>Add comments…</div>
        )}
      </div>
      {/* COL 3: Action Items */}
      <div style={{padding:"8px 12px",display:"flex",flexDirection:"column"}}>
        {c.tasks.map(t=>(
          <TaskRow key={t.id} task={t} isOnly={c.tasks.length===1}
            onUpdate={u=>onUpdateTask(c.id,t.id,u)} onDelete={()=>onDeleteTask(c.id,t.id)}
            onToggleWeek={()=>onToggleWeek(c.id,t.id)} onToggleComplete={()=>onToggleComplete(c.id,t.id)}/>
        ))}
        <button onClick={()=>onAddTask(c.id)} style={{marginTop:6,padding:"4px 0",fontSize:11,color:SKY,background:"none",border:`1px dashed ${SKY}`,borderRadius:5,cursor:"pointer",fontFamily:"sans-serif",fontWeight:600,textAlign:"center"}}>+ Add Task</button>
      </div>
    </div>
  );
}

// ─── Section Block ────────────────────────────────────────────────────────────
function SectionBlock({sec,consultants,purchaseDate,settlementDate,onUpdateC,onAddC,onDeleteC,onAddTask,onUpdateTask,onDeleteTask,onToggleWeek,onToggleComplete,collapsed,onToggleCollapse}){
  const twk=consultants.flatMap(c=>c.tasks).filter(t=>t.thisWeek).length;
  const active=consultants.flatMap(c=>c.tasks).filter(t=>t.action?.trim()).length;
  return(
    <div style={{marginBottom:14,borderRadius:10,overflow:"hidden",border:"1.5px solid #E8ECF0",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
      <div style={{display:"flex",alignItems:"center",background:sec.color}}>
        <button onClick={onToggleCollapse} style={{flex:1,display:"flex",alignItems:"center",gap:9,padding:"11px 16px",background:"none",border:"none",cursor:"pointer",textAlign:"left"}}>
          <span style={{fontSize:15}}>{sec.icon}</span>
          <span style={{fontSize:13,fontWeight:700,color:"white"}}>{sec.title}</span>
          {sec.id==="finance"&&(purchaseDate||settlementDate)&&(
            <span style={{fontSize:10,color:"rgba(255,255,255,0.6)",marginLeft:4}}>
              {purchaseDate&&`📅 Purchased: ${fmtDate(purchaseDate)}`}{purchaseDate&&settlementDate&&"  ·  "}{settlementDate&&`🏁 Settlement: ${fmtDate(settlementDate)}`}
            </span>
          )}
          <span style={{flex:1}}/>
          {twk>0&&<span style={{fontSize:10,background:SKY,color:"white",padding:"2px 8px",borderRadius:20,fontWeight:700}}>★ {twk} this week</span>}
          <span style={{fontSize:11,color:"rgba(255,255,255,0.5)",marginLeft:8}}>{active} action{active!==1?"s":""} · {collapsed?"▶":"▼"}</span>
        </button>
        {!collapsed&&<button onClick={onAddC} style={{margin:"0 12px",padding:"4px 12px",fontSize:11,fontWeight:700,background:"rgba(255,255,255,0.15)",color:"white",border:"1px solid rgba(255,255,255,0.3)",borderRadius:20,cursor:"pointer",fontFamily:"sans-serif",whiteSpace:"nowrap"}}>+ Add Row</button>}
      </div>
      {!collapsed&&(
        <>
          <div style={{display:"grid",gridTemplateColumns:"190px 1fr 1fr",background:"#F8F9FB",borderBottom:"1px solid #EEF0F3"}}>
            {["Consultant / Authority","General Comments","Action Items"].map((h,i)=>(
              <div key={h} style={{padding:"5px 12px",fontSize:10,fontWeight:700,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.06em",borderRight:i<2?"1px solid #EEF0F3":"none"}}>{h}</div>
            ))}
          </div>
          {consultants.map(c=>(
            <ConsultantBlock key={c.id} c={c} secColor={sec.color}
              onUpdate={u=>onUpdateC(sec.id,c.id,u)} onDelete={()=>onDeleteC(sec.id,c.id)}
              onAddTask={cId=>onAddTask(sec.id,cId)}
              onUpdateTask={(cId,tId,u)=>onUpdateTask(sec.id,cId,tId,u)}
              onDeleteTask={(cId,tId)=>onDeleteTask(sec.id,cId,tId)}
              onToggleWeek={(cId,tId)=>onToggleWeek(sec.id,cId,tId)}
              onToggleComplete={(cId,tId)=>onToggleComplete(sec.id,cId,tId)}/>
          ))}
        </>
      )}
    </div>
  );
}

// ─── This Week Row ────────────────────────────────────────────────────────────
function WeekRow({item,onToggleWeek,onToggleComplete,onNavigate}){
  const done=item.status==="Completed";
  return(
    <div style={{background:done?"#FAFAFA":"white",border:"1px solid #E8ECF0",borderLeft:`3px solid ${item.projectColor}`,borderRadius:7,marginBottom:5,padding:"10px 14px",display:"flex",alignItems:"flex-start",gap:10,opacity:done?0.65:1}}>
      <button onClick={()=>onToggleComplete(item.projectId,item.secId,item.cId,item.tId)}
        style={{flexShrink:0,marginTop:2,width:18,height:18,borderRadius:4,border:`2px solid ${done?"#10B981":"#D1D5DB"}`,background:done?"#10B981":"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0}}>
        {done&&<span style={{color:"white",fontSize:9,fontWeight:900}}>✓</span>}
      </button>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap",marginBottom:3}}>
          <span style={{fontSize:10,fontWeight:700,color:item.projectColor,textTransform:"uppercase",letterSpacing:"0.04em"}}>{item.projectName}</span>
          <span style={{color:"#CBD5E1",fontSize:10}}>›</span>
          <span style={{fontSize:10,color:"#9CA3AF"}}>{item.secTitle}</span>
          <span style={{color:"#CBD5E1",fontSize:10}}>›</span>
          <span style={{fontSize:10,color:"#6B7280"}}>{item.cLabel}{item.cName?` · ${item.cName}`:""}</span>
        </div>
        <div style={{fontSize:13,fontWeight:600,color:done?"#9CA3AF":"#1F2937",textDecoration:done?"line-through":"none",marginBottom:4}}>{item.action}</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontSize:11,fontWeight:700,color:INDIGO}}>@{PERSON_LIST.find(p=>p.id===item.person)?.label||item.person}</span>
          {item.due&&<span style={{fontSize:11,color:"#9CA3AF"}}>Due {fmtDate(item.due)}</span>}
          <Badge label={item.priority} cfg={priCfg[item.priority]||priCfg.Medium} small/>
          <Badge label={item.status} cfg={stsCfg[item.status]||stsCfg["Not Started"]} small/>
        </div>
      </div>
      <div style={{display:"flex",gap:5,flexShrink:0}}>
        <button onClick={()=>onToggleWeek(item.projectId,item.secId,item.cId,item.tId)} style={{padding:"3px 10px",borderRadius:20,fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"sans-serif",background:SKY_LT,border:`1.5px solid ${SKY}`,color:"#1E3A5F"}}>★ Remove</button>
        <button type="button" onClick={()=>onNavigate(item.projectId)} style={{padding:"3px 10px",borderRadius:20,fontSize:10,cursor:"pointer",fontFamily:"sans-serif",background:"none",border:"1px solid #E5E7EB",color:"#6B7280"}}>Open →</button>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App(){
  const[projects,setProjects]=useState(()=>buildProjects());
  const[view,setView]=useState("thisweek");
  const[activeProject,setActiveProject]=useState(null);
  const[search,setSearch]=useState("");
  const[filterPersons,setFilterPersons]=useState([]);
  const[filterPriority,setFilterPriority]=useState("All");
  const[filterStatus,setFilterStatus]=useState("All");
  const[collapsed,setCollapsed]=useState({});
  const[showAdd,setShowAdd]=useState(false);
  const[newName,setNewName]=useState("");
  const[newStage,setNewStage]=useState("Planning & Approvals");

  const mutate=fn=>setProjects(ps=>ps.map(p=>p.id===activeProject?fn(p):p));
  const updC=(sId,cId,u)=>mutate(p=>({...p,sections:{...p.sections,[sId]:p.sections[sId].map(c=>c.id===cId?u:c)}}));
  const addC=sId=>mutate(p=>({...p,sections:{...p.sections,[sId]:[...p.sections[sId],mkRow()]}}));
  const delC=(sId,cId)=>mutate(p=>({...p,sections:{...p.sections,[sId]:p.sections[sId].filter(c=>c.id!==cId)}}));
  const addT=(sId,cId)=>mutate(p=>({...p,sections:{...p.sections,[sId]:p.sections[sId].map(c=>c.id===cId?{...c,tasks:[...c.tasks,mkTask()]}:c)}}));
  const updT=(sId,cId,tId,u)=>mutate(p=>({...p,sections:{...p.sections,[sId]:p.sections[sId].map(c=>c.id===cId?{...c,tasks:c.tasks.map(t=>t.id===tId?u:t)}:c)}}));
  const delT=(sId,cId,tId)=>mutate(p=>({...p,sections:{...p.sections,[sId]:p.sections[sId].map(c=>c.id===cId?{...c,tasks:c.tasks.filter(t=>t.id!==tId)}:c)}}));
  const togW=(sId,cId,tId)=>mutate(p=>({...p,sections:{...p.sections,[sId]:p.sections[sId].map(c=>c.id===cId?{...c,tasks:c.tasks.map(t=>t.id===tId?{...t,thisWeek:!t.thisWeek}:t)}:c)}}));
  const togC=(sId,cId,tId)=>mutate(p=>({...p,sections:{...p.sections,[sId]:p.sections[sId].map(c=>c.id===cId?{...c,tasks:c.tasks.map(t=>t.id===tId?{...t,status:t.status==="Completed"?"In Progress":"Completed"}:t)}:c)}}));
  const gTog=(pId,sId,cId,tId,type)=>setProjects(ps=>ps.map(p=>p.id!==pId?p:{...p,sections:{...p.sections,[sId]:p.sections[sId].map(c=>c.id!==cId?c:{...c,tasks:c.tasks.map(t=>t.id!==tId?t:type==="week"?{...t,thisWeek:!t.thisWeek}:{...t,status:t.status==="Completed"?"In Progress":"Completed"})})}}));

  const addProject=()=>{
    if(!newName.trim())return;
    const cs=[INDIGO,"#1E1E5A","#E07B39","#5B4FCF","#2D6A4F","#B5451B","#7B5EA7","#0E6B5E"];
    const secs={};SECTION_META.forEach(s=>{secs[s.id]=[];});
    setProjects(ps=>[...ps,{id:uid(),name:newName.trim(),color:cs[ps.length%cs.length],stage:newStage,purchaseDate:"",settlementDate:"",sections:secs}]);
    setNewName("");setShowAdd(false);
  };

  // Single reliable navigation function
  const goToProject = (id) => { setActiveProject(id); setView("project"); };
  const goBack = () => { setActiveProject(null); setView("projects"); };

  const togglePerson=pid=>setFilterPersons(prev=>prev.includes(pid)?prev.filter(p=>p!==pid):[...prev,pid]);

  const thisWeekItems=useMemo(()=>{
    const items=[];
    projects.forEach(p=>{SECTION_META.forEach(sec=>{(p.sections[sec.id]||[]).forEach(c=>{c.tasks.forEach(t=>{
      if(t.thisWeek&&t.action?.trim())items.push({...t,projectId:p.id,projectName:p.name,projectColor:p.color,secId:sec.id,secTitle:sec.title,cId:c.id,cLabel:c.label,cName:c.name,tId:t.id});
    });});});});
    return items;
  },[projects]);

  const total=thisWeekItems.length;
  const done=thisWeekItems.filter(i=>i.status==="Completed").length;
  const high=thisWeekItems.filter(i=>i.priority==="High"&&i.status!=="Completed").length;
  const remaining=total-done;

  const filtered=useMemo(()=>thisWeekItems.filter(i=>{
    const ms=!search||i.action?.toLowerCase().includes(search.toLowerCase())||i.cName?.toLowerCase().includes(search.toLowerCase());
    const mp=filterPersons.length===0||filterPersons.includes(i.person);
    const mpr=filterPriority==="All"||i.priority===filterPriority;
    const mst=filterStatus==="All"
      ||(filterStatus==="High"&&i.priority==="High"&&i.status!=="Completed")
      ||(filterStatus==="Done"&&i.status==="Completed")
      ||(filterStatus==="Remaining"&&i.status!=="Completed");
    return ms&&mp&&mpr&&mst;
  }),[thisWeekItems,search,filterPersons,filterPriority,filterStatus]);

  const cur=projects.find(p=>p.id===activeProject);
  const today=new Date();

  // Clickable stat pill
  function StatPill({label,value,color,filterId}){
    const isActive=filterStatus===filterId;
    return(
      <div onClick={()=>setFilterStatus(isActive?"All":filterId)}
        style={{textAlign:"center",padding:"0 16px",borderLeft:"1px solid rgba(255,255,255,0.12)",cursor:"pointer",transition:"all 0.15s"}}>
        <div style={{fontSize:28,fontWeight:800,color,lineHeight:1,paddingBottom:3,borderBottom:isActive?`3px solid ${color}`:"3px solid transparent"}}>{value}</div>
        <div style={{fontSize:10,color:"rgba(255,255,255,0.5)",marginTop:5,fontFamily:"sans-serif",textTransform:"uppercase",letterSpacing:"0.06em"}}>{label}</div>
        {isActive&&<div style={{fontSize:9,color,fontFamily:"sans-serif",marginTop:2,fontWeight:600}}>● filtering</div>}
      </div>
    );
  }

  function FilterBar(){
    return(
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  Search actions or consultants..."
            style={{flex:1,minWidth:180,padding:"8px 14px",border:"1.5px solid #E5E7EB",borderRadius:8,fontSize:12,outline:"none",fontFamily:"sans-serif",background:"white"}}/>
          <select value={filterPriority} onChange={e=>setFilterPriority(e.target.value)}
            style={{padding:"8px 12px",border:"1.5px solid #E5E7EB",borderRadius:8,fontSize:12,background:"white",cursor:"pointer",fontFamily:"sans-serif"}}>
            {["All",...PRIORITIES].map(o=><option key={o}>{o==="All"?"All Priorities":o}</option>)}
          </select>
          {(filterStatus!=="All"||filterPersons.length>0||search)&&(
            <button onClick={()=>{setFilterStatus("All");setFilterPersons([]);setSearch("");}}
              style={{padding:"8px 14px",border:`1.5px solid ${SKY}`,borderRadius:8,fontSize:12,background:SKY_LT,color:"#1E3A5F",cursor:"pointer",fontFamily:"sans-serif",fontWeight:600}}>
              ✕ Clear all filters
            </button>
          )}
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontSize:11,color:"#9CA3AF",fontFamily:"sans-serif",marginRight:2}}>Team member:</span>
          {PERSON_LIST.filter(p=>["CS","SS","AL"].includes(p.id)).map(p=>{
            const active=filterPersons.includes(p.id);
            return(
              <button key={p.id} onClick={()=>togglePerson(p.id)}
                style={{padding:"5px 14px",borderRadius:20,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"sans-serif",
                  border:`1.5px solid ${active?INDIGO:"#E5E7EB"}`,
                  background:active?INDIGO:"white",
                  color:active?"white":"#6B7280",
                  transition:"all 0.15s"}}>
                {p.label}
              </button>
            );
          })}
          {filterPersons.length>0&&(
            <button onClick={()=>setFilterPersons([])}
              style={{padding:"5px 10px",borderRadius:20,fontSize:11,cursor:"pointer",fontFamily:"sans-serif",border:"1.5px solid #FCA5A5",background:"#FEF2F2",color:"#991B1B"}}>
              ✕ Clear
            </button>
          )}
        </div>
      </div>
    );
  }

  return(
    <div style={{fontFamily:"Georgia, serif",background:OFF_BG,minHeight:"100vh"}}>

      {/* ── Top Bar ── */}
      <div style={{background:INDIGO3,padding:"0 24px",display:"flex",alignItems:"center",borderBottom:`3px solid ${SKY}`}}>
        <div onClick={()=>{setView("thisweek");setActiveProject(null);}} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 0",cursor:"pointer"}}>
          <img src={LOGO_URI} alt="SALT" style={{height:46,width:46,objectFit:"contain",filter:"brightness(0) invert(1)"}}/>
          <div>
            <div style={{fontSize:15,fontWeight:800,color:"white",letterSpacing:"0.08em",lineHeight:1.1}}>SALT</div>
            <div style={{fontSize:9,color:SKY,fontFamily:"sans-serif",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase"}}>Development Projects</div>
          </div>
        </div>
        <div style={{flex:1}}/>
        {[{k:"thisweek",l:"★ This Week"},{k:"projects",l:"All Projects"}].map(({k,l})=>(
          <button key={k} onClick={()=>{setView(k);setActiveProject(null);}}
            style={{padding:"8px 18px",marginLeft:2,border:"none",background:"transparent",
              borderBottom:view===k&&!activeProject?`3px solid ${SKY}`:"3px solid transparent",
              color:view===k&&!activeProject?SKY:"rgba(255,255,255,0.55)",
              fontWeight:view===k&&!activeProject?700:400,
              cursor:"pointer",fontSize:13,fontFamily:"sans-serif"}}>{l}</button>
        ))}
        <div style={{width:1,height:28,background:"rgba(255,255,255,0.1)",margin:"0 14px"}}/>
        <span style={{fontSize:11,color:"rgba(255,255,255,0.35)",fontFamily:"sans-serif"}}>{today.toLocaleDateString("en-AU",{weekday:"short",day:"numeric",month:"short",year:"numeric"})}</span>
      </div>

      <div style={{maxWidth:1180,margin:"0 auto",padding:"24px"}}>

        {/* ══ THIS WEEK ══ */}
        {view==="thisweek"&&!activeProject&&(
          <>
            {/* Hero */}
            <div style={{background:`linear-gradient(135deg, ${INDIGO3} 0%, ${INDIGO2} 60%, ${INDIGO} 100%)`,borderRadius:14,padding:"24px 28px",marginBottom:20,display:"flex",alignItems:"center",gap:4,flexWrap:"wrap",boxShadow:"0 4px 24px rgba(15,0,60,0.2)"}}>
              <div style={{flex:1,minWidth:200}}>
                <div style={{fontSize:10,color:SKY,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:4,fontFamily:"sans-serif"}}>Week in Focus</div>
                <div style={{fontSize:19,fontWeight:700,color:"white",marginBottom:2}}>{getWeekRange()}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.45)",fontFamily:"sans-serif",marginBottom:12}}>{done} of {total} actions completed</div>
                <div style={{height:5,background:"rgba(255,255,255,0.1)",borderRadius:10,maxWidth:280}}>
                  <div style={{height:"100%",width:`${total?(done/total)*100:0}%`,background:SKY,borderRadius:10,transition:"width 0.4s"}}/>
                </div>
                {filterStatus!=="All"&&(
                  <div style={{marginTop:10,fontSize:11,color:SKY,fontFamily:"sans-serif"}}>
                    Showing: <strong>{filterStatus}</strong> ({filtered.length} items)
                    <button onClick={()=>setFilterStatus("All")} style={{marginLeft:8,fontSize:10,color:SKY,background:"none",border:"none",cursor:"pointer",textDecoration:"underline",fontFamily:"sans-serif"}}>clear</button>
                  </div>
                )}
              </div>
              <div style={{display:"flex",gap:0}}>
                <StatPill label="Total"     value={total}     color="white"   filterId="All"/>
                <StatPill label="High ⚠"   value={high}      color="#FCA5A5" filterId="High"/>
                <StatPill label="Done"      value={done}      color="#6EE7B7" filterId="Done"/>
                <StatPill label="Remaining" value={remaining} color={SKY}     filterId="Remaining"/>
              </div>
            </div>

            <FilterBar/>

            {projects.map(p=>{
              const items=filtered.filter(i=>i.projectId===p.id);
              if(!items.length)return null;
              return(
                <div key={p.id} style={{marginBottom:18}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                    <div style={{width:9,height:9,borderRadius:"50%",background:p.color}}/>
                    <button type="button" onClick={()=>goToProject(p.id)} style={{fontSize:12,fontWeight:700,color:p.color,textTransform:"uppercase",letterSpacing:"0.05em",background:"none",border:"none",cursor:"pointer",padding:0}}>{p.name}</button>
                    <span style={{fontSize:11,color:"#9CA3AF",fontFamily:"sans-serif"}}>{items.filter(i=>i.status==="Completed").length}/{items.length} done</span>
                    <div style={{flex:1,height:1,background:"#E5E7EB"}}/>
                    <button type="button" onClick={()=>goToProject(p.id)} style={{fontSize:11,color:SKY,background:"none",border:"none",cursor:"pointer",fontWeight:600,fontFamily:"sans-serif"}}>Open Project →</button>
                  </div>
                  {items.map(item=><WeekRow key={`${item.projectId}-${item.secId}-${item.cId}-${item.tId}`} item={item} onToggleWeek={(pId,sId,cId,tId)=>gTog(pId,sId,cId,tId,"week")} onToggleComplete={(pId,sId,cId,tId)=>gTog(pId,sId,cId,tId,"done")} onNavigate={id=>goToProject(id)}/>)}
                </div>
              );
            })}
            {filtered.length===0&&total>0&&(
              <div style={{textAlign:"center",padding:"50px",color:"#9CA3AF"}}>
                <div style={{fontSize:32,marginBottom:8}}>🔍</div>
                <div style={{fontSize:14,fontWeight:600,marginBottom:6}}>No items match your filter</div>
                <button onClick={()=>{setFilterStatus("All");setFilterPersons([]);setSearch("");}} style={{fontSize:12,color:SKY,background:"none",border:"none",cursor:"pointer",fontFamily:"sans-serif",textDecoration:"underline"}}>Clear all filters</button>
              </div>
            )}
            {total===0&&(<div style={{textAlign:"center",padding:"60px",color:"#9CA3AF"}}><div style={{fontSize:36,marginBottom:10}}>☆</div><div style={{fontSize:15,fontWeight:600,marginBottom:6}}>No actions flagged this week</div><div style={{fontSize:12,fontFamily:"sans-serif"}}>Open a project and tap ☆ on any task to flag it</div></div>)}
          </>
        )}

        {/* ══ ALL PROJECTS ══ */}
        {view==="projects"&&!activeProject&&(
          <>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <h2 style={{margin:0,fontSize:18,color:INDIGO3}}>All Projects</h2>
              <button onClick={()=>setShowAdd(v=>!v)} style={{padding:"8px 18px",background:INDIGO,color:"white",border:"none",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"sans-serif"}}>+ New Project</button>
            </div>
            {showAdd&&(
              <div style={{background:"white",border:"1.5px solid #E5E7EB",borderRadius:10,padding:16,marginBottom:16,display:"flex",gap:8,flexWrap:"wrap",alignItems:"flex-end"}}>
                <div style={{flex:1,minWidth:180,display:"flex",flexDirection:"column",gap:4}}>
                  <label style={{fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",fontFamily:"sans-serif"}}>Project Name</label>
                  <input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="e.g. Smith Road Coomera" style={{padding:"8px 12px",border:"1.5px solid #E5E7EB",borderRadius:6,fontSize:13,outline:"none",fontFamily:"sans-serif"}}/>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:4}}>
                  <label style={{fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",fontFamily:"sans-serif"}}>Stage</label>
                  <select value={newStage} onChange={e=>setNewStage(e.target.value)} style={{padding:"8px 12px",border:"1.5px solid #E5E7EB",borderRadius:6,fontSize:13,outline:"none",fontFamily:"sans-serif"}}>
                    {STAGES.map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
                <button onClick={addProject} style={{padding:"8px 18px",background:INDIGO,color:"white",border:"none",borderRadius:6,cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"sans-serif"}}>Add</button>
                <button onClick={()=>setShowAdd(false)} style={{padding:"8px 14px",background:"#F3F4F6",border:"none",borderRadius:6,cursor:"pointer",fontSize:13,fontFamily:"sans-serif"}}>Cancel</button>
              </div>
            )}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:12}}>
              {projects.map(p=>{
                const all=SECTION_META.flatMap(s=>(p.sections[s.id]||[]).flatMap(c=>c.tasks));
                const act=all.filter(t=>t.action?.trim()),dn=all.filter(t=>t.status==="Completed"),tw=all.filter(t=>t.thisWeek&&t.action?.trim()).length,hi=all.filter(t=>t.priority==="High"&&t.status!=="Completed"&&t.action?.trim()).length;
                return(
                  <button type="button" key={p.id} onClick={()=>goToProject(p.id)}
                    style={{background:"white",border:"1.5px solid #E8ECF0",borderTop:`4px solid ${p.color}`,borderRadius:10,padding:"16px 18px",cursor:"pointer",userSelect:"none",width:"100%",textAlign:"left",display:"block"}}
                    onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 20px rgba(45,45,105,0.14)"}
                    onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10,pointerEvents:"none"}}>
                      <div>
                        <div style={{fontSize:14,fontWeight:700,color:INDIGO3,marginBottom:4}}>{p.name}</div>
                        <span style={{display:"inline-flex",padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:600,background:SKY_LT,color:INDIGO}}>{p.stage}</span>
                      </div>
                      <div style={{width:36,height:36,borderRadius:"50%",background:p.color,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:14,fontWeight:700,flexShrink:0}}>{p.name[0]}</div>
                    </div>
                    {(p.purchaseDate||p.settlementDate)&&<div style={{fontSize:10,color:"#9CA3AF",marginBottom:8,fontFamily:"sans-serif",pointerEvents:"none"}}>{p.purchaseDate&&`Purchased: ${fmtDate(p.purchaseDate)}`}{p.purchaseDate&&p.settlementDate&&"  ·  "}{p.settlementDate&&`Settlement: ${fmtDate(p.settlementDate)}`}</div>}
                    <div style={{display:"flex",gap:14,pointerEvents:"none"}}>
                      {[["Tasks",act.length],["Done",dn.length],["This Wk",tw],["High ⚠",hi]].map(([l,v])=>(
                        <div key={l} style={{textAlign:"center"}}>
                          <div style={{fontSize:17,fontWeight:700,color:l==="High ⚠"&&v>0?"#EF4444":INDIGO3}}>{v}</div>
                          <div style={{fontSize:9,color:"#9CA3AF",fontFamily:"sans-serif",textTransform:"uppercase"}}>{l}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{marginTop:10,height:3,background:"#EEF0F5",borderRadius:10,pointerEvents:"none"}}><div style={{height:"100%",width:`${act.length?(dn.length/act.length)*100:0}%`,background:p.color,borderRadius:10}}/></div>
                    <div style={{marginTop:8,fontSize:11,color:SKY,fontWeight:600,fontFamily:"sans-serif",textAlign:"right",pointerEvents:"none"}}>Open project →</div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* ══ SINGLE PROJECT ══ */}
        {view==="project"&&activeProject&&cur&&(
          <>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>
              <button type="button" onClick={goBack} style={{background:"none",border:"none",cursor:"pointer",fontSize:13,color:SKY,fontWeight:600,fontFamily:"sans-serif"}}>← Back</button>
              <div style={{width:1,height:20,background:"#E5E7EB"}}/>
              <div style={{width:10,height:10,borderRadius:"50%",background:cur.color}}/>
              <h2 style={{margin:0,fontSize:18,color:INDIGO3}}>{cur.name}</h2>
              <span style={{display:"inline-flex",padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:600,background:SKY_LT,color:INDIGO}}>{cur.stage}</span>
            </div>
            {(cur.purchaseDate||cur.settlementDate)&&<div style={{fontSize:11,color:"#9CA3AF",marginBottom:14,fontFamily:"sans-serif"}}>{cur.purchaseDate&&`📅 Purchase: ${fmtDate(cur.purchaseDate)}`}{cur.purchaseDate&&cur.settlementDate&&"   ·   "}{cur.settlementDate&&`🏁 Settlement: ${fmtDate(cur.settlementDate)}`}</div>}
            <div style={{display:"flex",gap:8,marginBottom:14}}>
              <button onClick={()=>{const s={};SECTION_META.forEach(m=>{s[`${cur.id}-${m.id}`]=true;});setCollapsed(s);}} style={{fontSize:11,color:"#6B7280",background:"none",border:"1px solid #E5E7EB",borderRadius:5,padding:"4px 12px",cursor:"pointer",fontFamily:"sans-serif"}}>Collapse All</button>
              <button onClick={()=>setCollapsed({})} style={{fontSize:11,color:"#6B7280",background:"none",border:"1px solid #E5E7EB",borderRadius:5,padding:"4px 12px",cursor:"pointer",fontFamily:"sans-serif"}}>Expand All</button>
            </div>
            {SECTION_META.map(sec=>(
              <SectionBlock key={sec.id} sec={sec} consultants={cur.sections[sec.id]||[]} purchaseDate={cur.purchaseDate} settlementDate={cur.settlementDate}
                onUpdateC={(sId,cId,u)=>updC(sId,cId,u)} onAddC={()=>addC(sec.id)} onDeleteC={(sId,cId)=>delC(sId,cId)}
                onAddTask={(sId,cId)=>addT(sId,cId)} onUpdateTask={(sId,cId,tId,u)=>updT(sId,cId,tId,u)} onDeleteTask={(sId,cId,tId)=>delT(sId,cId,tId)}
                onToggleWeek={(sId,cId,tId)=>togW(sId,cId,tId)} onToggleComplete={(sId,cId,tId)=>togC(sId,cId,tId)}
                collapsed={!!collapsed[`${cur.id}-${sec.id}`]} onToggleCollapse={()=>setCollapsed(s=>({...s,[`${cur.id}-${sec.id}`]:!s[`${cur.id}-${sec.id}`]}))}/>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
