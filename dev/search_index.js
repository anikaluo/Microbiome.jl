var documenterSearchIndex = {"docs":
[{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"CurrentModule = Microbiome\nDocTestSetup  = quote\n    using Microbiome\n    using Microbiome.SparseArrays\n    using Random\n    Random.seed!(42)\nend","category":"page"},{"location":"profiles/#Working-with-microbial-abundances","page":"Profiles and Communities","title":"Working with microbial abundances","text":"","category":"section"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"The primary type for working with microbial abundances is the CommunityProfile, which is a sparse matrix with MicrobiomeSamples as column indices and features (eg Taxons or GeneFunctions) as row indices.","category":"page"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"For example, let's make a CommunityProfile with 3 samples, 5 species and 5 genera.","category":"page"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"julia> samps = MicrobiomeSample.([\"s1\", \"s2\", \"s3\"])\n3-element Vector{MicrobiomeSample}:\n MicrobiomeSample(\"s1\", {})\n MicrobiomeSample(\"s2\", {})\n MicrobiomeSample(\"s3\", {})\n\njulia> taxa = [[Taxon(\"s$i\", :species) for i in 1:5]; [Taxon(\"g$i\", :genus) for i in 1:5]]\n10-element Vector{Taxon}:\n Taxon(\"s1\", :species)\n Taxon(\"s2\", :species)\n Taxon(\"s3\", :species)\n Taxon(\"s4\", :species)\n Taxon(\"s5\", :species)\n Taxon(\"g1\", :genus)\n Taxon(\"g2\", :genus)\n Taxon(\"g3\", :genus)\n Taxon(\"g4\", :genus)\n Taxon(\"g5\", :genus)\n\njulia> mat = spzeros(10, 3); # 10 x 3 matrix filled with zeros\n\njulia> for i in 1:10, j in 1:3 \n           # fill some spots with random values\n           rand() < 0.3 && (mat[i,j] = rand())\n       end\n\njulia> mat\n10×3 SparseMatrixCSC{Float64, Int64} with 10 stored entries:\n  ⋅         ⋅        0.172933\n  ⋅         ⋅         ⋅\n 0.956916   ⋅         ⋅\n 0.422956   ⋅         ⋅\n  ⋅         ⋅         ⋅\n 0.502952   ⋅        0.167169\n  ⋅         ⋅        0.244683\n  ⋅         ⋅        0.143638\n 0.570085  0.249238   ⋅\n  ⋅        0.841643   ⋅\n\njulia> comm = CommunityProfile(mat, taxa, samps)\nCommunityProfile{Float64, Taxon, MicrobiomeSample} with 10 features in 3 samples\n\nFeature names:\ns1, s2, s3...g4, g5\n\nSample names:\ns1, s2, s3","category":"page"},{"location":"profiles/#Accessing-CommunitProfile-contents","page":"Profiles and Communities","title":"Accessing CommunitProfile contents","text":"","category":"section"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"It is easy to get out the underlying abundance matrix, features, and samples using abundances, features, and samples respectively:","category":"page"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"julia> abundances(comm)\n10×3 SparseMatrixCSC{Float64, Int64} with 10 stored entries:\n  ⋅         ⋅        0.172933\n  ⋅         ⋅         ⋅\n 0.956916   ⋅         ⋅\n 0.422956   ⋅         ⋅\n  ⋅         ⋅         ⋅\n 0.502952   ⋅        0.167169\n  ⋅         ⋅        0.244683\n  ⋅         ⋅        0.143638\n 0.570085  0.249238   ⋅\n  ⋅        0.841643   ⋅\n\njulia> features(comm)\n10-element Vector{Taxon}:\n Taxon(\"s1\", :species)\n Taxon(\"s2\", :species)\n Taxon(\"s3\", :species)\n Taxon(\"s4\", :species)\n Taxon(\"s5\", :species)\n Taxon(\"g1\", :genus)\n Taxon(\"g2\", :genus)\n Taxon(\"g3\", :genus)\n Taxon(\"g4\", :genus)\n Taxon(\"g5\", :genus)\n \njulia> samples(comm)\n3-element Vector{MicrobiomeSample}:\n MicrobiomeSample(\"s1\", {})\n MicrobiomeSample(\"s2\", {})\n MicrobiomeSample(\"s3\", {})","category":"page"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"You can also just get an array of feature and sample names using featurenames and samplenames respectively.","category":"page"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"julia> featurenames(comm)\n10-element Vector{String}:\n \"s1\"\n \"s2\"\n \"s3\"\n \"s4\"\n \"s5\"\n \"g1\"\n \"g2\"\n \"g3\"\n \"g4\"\n \"g5\"\n\njulia> samplenames(comm)\n3-element Vector{String}:\n \"s1\"\n \"s2\"\n \"s3\"","category":"page"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"Finally, you can pull out the metadata of all samples or a subset using metadata. The returned value is a vector of NamedTuples, which is compliant with the Tables.jl interface, so it's easy to load into other formats (like DataFrames.jl for example):","category":"page"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"julia> metadata(comm)\n3-element Vector{NamedTuple{(:sample,), Tuple{String}}}:\n (sample = \"s1\",)\n (sample = \"s2\",)\n (sample = \"s3\",)","category":"page"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"Of course, for now, the metadata is pretty boring -  jump ahead to Working with metadata to do some more fun things.","category":"page"},{"location":"profiles/#Indexing-and-selecting","page":"Profiles and Communities","title":"Indexing and selecting","text":"","category":"section"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"CommunityProfiles wrap a sparse matrix, and you can access the values as you would a normal matrix. In julia, you can pull out specific values using [row, col]. So for example, to get the 3rd row, 2nd column, of matrix mat:","category":"page"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"julia> mat = reshape(1:12, 4, 3) |> collect\n4×3 Matrix{Int64}:\n 1  5   9\n 2  6  10\n 3  7  11\n 4  8  12\n\njulia> mat[3,2]\n7","category":"page"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"You can also get \"slices\", eg to get rows 2-4, column 1:","category":"page"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"julia> mat[2:4, 1]\n3-element Vector{Int64}:\n 2\n 3\n 4","category":"page"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"To get all of one dimension, you can just use a bare :","category":"page"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"julia> mat[:, 1:2]\n4×2 Matrix{Int64}:\n 1  5\n 2  6\n 3  7\n 4  8","category":"page"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"For CommunityProfiles, indexing with integer values will return the value of the matrix at that position, while indexing with slices will return a new CommunityProfile:","category":"page"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"julia> comm[1,3]\n0.17293302893695128\n\njulia> comm[6:8,3]\nCommunityProfile{Float64, Taxon, MicrobiomeSample} with 3 features in 1 samples\n\nFeature names:\ng1, g2, g3\n\nSample names:\ns3\n\n\n\njulia> comm[1:3,3] |> abundances\n3×1 SparseMatrixCSC{Float64, Int64} with 1 stored entry:\n 0.172933\n  ⋅\n  ⋅","category":"page"},{"location":"profiles/#Indexing-with-strings-and-regular-expressions","page":"Profiles and Communities","title":"Indexing with strings and regular expressions","text":"","category":"section"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"It is often inconvenient to find the numerical index of a particular feature or sample. Instead, you can use strings or regular expressions to get slices of a CommunityProfile, which will match on the name field of the features or samples. This kind of indexing always returns a CommunityProfile, even if it only has 1 value.","category":"page"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"julia> comm[\"g1\", \"s1\"]\nCommunityProfile{Float64, Taxon, MicrobiomeSample} with 1 features in 1 samples\n\nFeature names:\ng1\n\nSample names:\ns1\n\n\n\njulia> comm[r\"[gs]1\", \"s1\"]\nCommunityProfile{Float64, Taxon, MicrobiomeSample} with 2 features in 1 samples\n\nFeature names:\ns1, g1\n\nSample names:\ns1","category":"page"},{"location":"profiles/#working-metadata","page":"Profiles and Communities","title":"Working with metadata","text":"","category":"section"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"The metadata dictionaries of MicrobiomeSamples can accessed and updated inside a CommunityProfile using insert!, delete!, set!, and unset!. either by directly acting on the underlying sample object, or using special methods that take the sample name as the second argument:","category":"page"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"julia> set!(samples(comm)[1], :subject, \"kevin\")\nMicrobiomeSample(\"s1\", {:subject = \"kevin\"})\n\njulia> insert!(comm, \"s2\", :subject, \"anika\")\nMicrobiomeSample(\"s2\", {:subject = \"anika\"})","category":"page"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"You can also retrieve all metadata associated with a table using metadata, which will return a Tables.jl-compatible vector or NamedTuples, where each \"row\" corresponds to one sample. All metadata fields found in any sample will be returned in every row, with the value missing in any samples that do not have that field set.","category":"page"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"julia> metadata(comm)\n3-element Vector{NamedTuple{(:sample, :subject), T} where T<:Tuple}:\n (sample = \"s1\", subject = \"kevin\")\n (sample = \"s2\", subject = \"anika\")\n (sample = \"s3\", subject = missing)","category":"page"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"And you can bulk-insert! or set! metadata by passing a similar Table-like object with the a field (:sample by default) matching sample names found in the CommunityProfile.","category":"page"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"julia> md = [(sample=\"s1\", subject=\"kevin\", foo=\"bar\"), (sample=\"s3\", subject=\"annelle\", foo=\"baz\")]\n2-element Vector{NamedTuple{(:sample, :subject, :foo), Tuple{String, String, String}}}:\n (sample = \"s1\", subject = \"kevin\", foo = \"bar\")\n (sample = \"s3\", subject = \"annelle\", foo = \"baz\")\n\njulia> set!(comm, md)\n\njulia> md2 = [(name=\"s1\", other=\"Hello, World!\"), (name=\"s2\", other=\"Goodbye!\")]\n2-element Vector{NamedTuple{(:name, :other), Tuple{String, String}}}:\n (name = \"s1\", other = \"Hello, World!\")\n (name = \"s2\", other = \"Goodbye!\")\n\njulia> insert!(comm, md2; namecol=:name)\n\njulia> metadata(comm)\n3-element Vector{NamedTuple{(:sample, :subject, :foo, :other), T} where T<:Tuple}:\n (sample = \"s1\", subject = \"kevin\", foo = \"bar\", other = \"Hello, World!\")\n (sample = \"s2\", subject = \"anika\", foo = missing, other = \"Goodbye!\")\n (sample = \"s3\", subject = \"annelle\", foo = \"baz\", other = missing)","category":"page"},{"location":"profiles/#Types-and-Methods","page":"Profiles and Communities","title":"Types and Methods","text":"","category":"section"},{"location":"profiles/","page":"Profiles and Communities","title":"Profiles and Communities","text":"CommunityProfile\nsamples\nfeatures\nsamplenames\n**featurenames**\ncommjoin\nrelativeabundance\nrelativeabundance!\npresent\nprevalence\nprevalence_filter","category":"page"},{"location":"profiles/#Microbiome.CommunityProfile","page":"Profiles and Communities","title":"Microbiome.CommunityProfile","text":"CommunityProfile{T, F, S} <: AbstractAbundanceTable{T, F, S}\n\nAn AbstractAssemblage from EcoBase.jl that uses an AxisArray of a SparseMatrixCSC under the hood.\n\nCommunityProfiles are tables with AbstractFeature-indexed rows and AbstractSample-indexed columns. Note - we can use the name of samples and features to index. ```\n\n\n\n\n\n","category":"type"},{"location":"profiles/#Microbiome.samples","page":"Profiles and Communities","title":"Microbiome.samples","text":"samples(at::AbstractAbundanceTable)\n\nReturns samples in at. To get samplenames instead, use samplenames.\n\n\n\n\n\nsamples(at::AbstractAbundanceTable, name::AbstractString)\n\nReturns sample in at with name name.\n\n\n\n\n\n","category":"function"},{"location":"profiles/#Microbiome.features","page":"Profiles and Communities","title":"Microbiome.features","text":"features(at::AbstractAbundanceTable)\n\nReturns features in at. To get featurenames instead, use featurenames.\n\n\n\n\n\n","category":"function"},{"location":"profiles/#Microbiome.samplenames","page":"Profiles and Communities","title":"Microbiome.samplenames","text":"samplenames(at::AbstractAbundanceTable)\n\nGet a vector of sample names from at, equivalent to name.(samples(at))\n\n\n\n\n\n","category":"function"},{"location":"license/","page":"-","title":"-","text":"MIT License","category":"page"},{"location":"license/","page":"-","title":"-","text":"Copyright (c) 2017 BioJulia","category":"page"},{"location":"license/","page":"-","title":"-","text":"Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:","category":"page"},{"location":"license/","page":"-","title":"-","text":"The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.","category":"page"},{"location":"license/","page":"-","title":"-","text":"THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.","category":"page"},{"location":"diversity/","page":"Diversity measures","title":"Diversity measures","text":"CurrentModule = Microbiome\nDocTestSetup  = quote\n    using Microbiome\n    using SparseArrays\n    using Random\n    Random.seed!(42)\nend","category":"page"},{"location":"diversity/#Diversity-measures-on-communities-and-samples","page":"Diversity measures","title":"Diversity measures on communities and samples","text":"","category":"section"},{"location":"diversity/#Alpha-Diversity","page":"Diversity measures","title":"Alpha Diversity","text":"","category":"section"},{"location":"diversity/","page":"Diversity measures","title":"Diversity measures","text":"shannon\nshannon!\nginisimpson\nginisimpson!","category":"page"},{"location":"diversity/#Microbiome.shannon","page":"Diversity measures","title":"Microbiome.shannon","text":"shannon(v::Union{AbstractVector, AbstractSparseMatrix}) \nshannon(abt::AbstractAbundanceTable)\n\nComputes the Shannon alpha diversity metric for a vector. When called on an AbstractAbundanceTable, returns a 1 x nsamples matrix with 1 entry per sample. See also shannon!.\n\n\n\n\n\n","category":"function"},{"location":"diversity/#Microbiome.shannon!","page":"Diversity measures","title":"Microbiome.shannon!","text":"shannon!(abt::AbstractAbundanceTable; overwrite=false)\n\nAdds a :shannon entry to the metadata for each sample in abt with the Shannon alpha diversity of that sample (see shannon). If overwrite=false (the default), uses insert! to perform this operation, so an error will be thrown if any sample already contains a :shannon entry. Otherwise, uses set!.\n\n\n\n\n\n","category":"function"},{"location":"diversity/#Microbiome.ginisimpson","page":"Diversity measures","title":"Microbiome.ginisimpson","text":"ginisimpson(v::Union{AbstractVector, AbstractSparseMatrix}) \nginisimpson(abt::AbstractAbundanceTable, overwrite=false)\n\nComputes the Gini-Simpson alpha diversity metric for a vector. When called on an AbstractAbundanceTable, returns a 1 x nsamples matrix with 1 entry per sample. See also ginisimpson!.\n\n\n\n\n\n","category":"function"},{"location":"diversity/#Microbiome.ginisimpson!","page":"Diversity measures","title":"Microbiome.ginisimpson!","text":"ginisimpson!(abt::AbstractAbundanceTable; overwrite=false)\n\nAdds a :ginisimpson entry to the metadata for each sample in abt with the Gini-Simpson alpha diversity of that sample (see ginisimpson). If overwrite=false (the default), uses insert! to perform this operation, so an error will be thrown if any sample already contains a :ginisimpson entry. Otherwise, uses set!.\n\n\n\n\n\n","category":"function"},{"location":"diversity/#Beta-Diversity","page":"Diversity measures","title":"Beta Diversity","text":"","category":"section"},{"location":"diversity/","page":"Diversity measures","title":"Diversity measures","text":"Quite often, it's useful to boil stuff down to distances between samples. AbstractAbundanceTables take advantage of the pairwise function from Distances.jl to get a symetric distance matrix.","category":"page"},{"location":"diversity/","page":"Diversity measures","title":"Diversity measures","text":"Right now, only Bray-Curtis, Jaccard, and Hellinger are implemented,  but it would be straightforward to add any others. Open an issue if you want them!","category":"page"},{"location":"diversity/","page":"Diversity measures","title":"Diversity measures","text":"You can also get fit a principal coordinates analysis (PCoA) to your AbstractAbundanceTable using the fit(MDS, ...) from MultivariateStats.jl under the hood.","category":"page"},{"location":"diversity/","page":"Diversity measures","title":"Diversity measures","text":"braycurtis\njaccard\nhellinger\npcoa","category":"page"},{"location":"diversity/#Microbiome.braycurtis","page":"Diversity measures","title":"Microbiome.braycurtis","text":"braycurtis(abt::AbstractAbundanceTable)\n\nReturns a pairwise Bray-Curtis dissimilarity matrix.\n\n\n\n\n\n","category":"function"},{"location":"diversity/#Microbiome.jaccard","page":"Diversity measures","title":"Microbiome.jaccard","text":"jaccard(abt::AbstractAbundanceTable)\n\nReturns a pairwise Jaccard distance matrix.\n\n\n\n\n\n","category":"function"},{"location":"diversity/#Microbiome.hellinger","page":"Diversity measures","title":"Microbiome.hellinger","text":"hellinger(abt::AbstractAbundanceTable)\n\nReturns a pairwise Hellinger distance matrix.\n\n\n\n\n\n","category":"function"},{"location":"diversity/#Microbiome.pcoa","page":"Diversity measures","title":"Microbiome.pcoa","text":"pcoa(abt::AbstractAbundanceTable, f=braycurtis)\n\nReturns eigenvectors from fitting MDS to a distance metric generated by f, by default braycurtis.\n\n\n\n\n\n","category":"function"},{"location":"contributing/#Contributing","page":"Contributing","title":"Contributing","text":"","category":"section"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"The BioJulia organisation has a set of contribution guidelines which apply to all BioJulia projects. These guidelines are available here and it is recommended all new contributors read these guidelines before opening a pull request.","category":"page"},{"location":"contributing/#Making-a-contribution","page":"Contributing","title":"Making a contribution","text":"","category":"section"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"If you're interested in adding functionality to Microbiome.jl, please feel free to open an issue or a pull request (PR) against the main branch. If you're not yet ready for that, you can also ask questions/start a discussion in the #biology channel on slack or zulip, or using the biology domain on discourse. ","category":"page"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"Work-in-progress PRs are fine, as discussion about approach and code review can happen in the PR.","category":"page"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"Before merging, any new code should be unit tested and have docs for newly exported functions, but if you don't know how to do this, don't worry, we can help!","category":"page"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"CurrentModule = Microbiome\nDocTestSetup  = quote\n    using Microbiome\n    using Microbiome.Dictionaries\nend","category":"page"},{"location":"samples_features/#Samples-and-Features","page":"Samples and features","title":"Samples and Features","text":"","category":"section"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"Microbial profiles are made up of AbstractSamples and AbstractFeatures. Typically, an AbstractSample is an individual biospecimen or other observation, and contains some number of AbstractFeatures, such as taxa or gene functions. AbstractSamples may also contain arbitrary metadata.","category":"page"},{"location":"samples_features/#Sample-types","page":"Samples and features","title":"Sample types","text":"","category":"section"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"At its most basic, an AbstractSample simply encodes a name (which should be a unique identifier), and a place to hold metadata. The concrete type MicrobiomeSample is implemented with these two fields, the latter of which is a Dictionary from Dictionaries.jl.","category":"page"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"You can instantiate a MicrobiomeSample with just a name (in which case the metadata dictionary will be empty), with existing metadata in the form of a dictionary, or using keyword arguments for metadata entries.","category":"page"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"julia> s1 = MicrobiomeSample(\"sample1\")\nMicrobiomeSample(\"sample1\", {})\n\njulia> s2 = MicrobiomeSample(\"sample2\"; age=37)\nMicrobiomeSample(\"sample2\", {:age = 37})\n\njulia> s3 = MicrobiomeSample(\"sample3\", Dictionary([:gender, :age], [\"female\", 23]))\nMicrobiomeSample(\"sample3\", {:gender = \"female\", :age = 23})","category":"page"},{"location":"samples_features/#Working-with-metadata","page":"Samples and features","title":"Working with metadata","text":"","category":"section"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"To change or add metadata, you can use the same syntax as working with a [Dictionary] directly, though note that this is a bit different from the Dict type in base julia:","category":"page"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"julia> insert!(s1, :age, 50)\nMicrobiomeSample(\"sample1\", {:age = 50})\n\njulia> set!(s3, :gender, \"nonbinary\")\nMicrobiomeSample(\"sample3\", {:gender = \"nonbinary\", :age = 23})\n\njulia> delete!(s3, :gender)\nMicrobiomeSample(\"sample3\", {:age = 23})","category":"page"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"You can access values of the dictionary using either getindex or getfield syntax, that is:","category":"page"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"julia> s3[:age]\n23\n\njulia> s3.age\n23","category":"page"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"Bulk addiction of metadata is also possible, by passing a Dictionary or NamedTuple to set! or insert! (the latter will fail if any of the incoming keys are already found):","category":"page"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"julia> insert!(s3, (gender = \"nonbinary\", genotype=\"XX\"))\nMicrobiomeSample(\"sample3\", {:age = 23, :gender = \"nonbinary\", :genotype = \"XX\"})\n\njulia> set!(s3, (genotype=\"XY\", ses=7))\nMicrobiomeSample(\"sample3\", {:age = 23, :gender = \"nonbinary\", :genotype = \"XY\", :ses = 7})","category":"page"},{"location":"samples_features/#Feature-Types","page":"Samples and features","title":"Feature Types","text":"","category":"section"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"AbstractFeature types also have a name, but other fields are optional. Microbiome.jl defines two concrete AbstractFeature types, Taxon and GeneFunction.","category":"page"},{"location":"samples_features/#Taxon","page":"Samples and features","title":"Taxon","text":"","category":"section"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"The Taxon type contains a name and (optionally) a rank (eg :phylum).","category":"page"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"julia> ecoli = Taxon(\"Escherichia_coli\", :species)\nTaxon(\"Escherichia_coli\", :species)\n\njulia> uncl = Taxon(\"Unknown_bug\")\nTaxon(\"Unknown_bug\", missing)","category":"page"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"You can access the name and rank fields using name and taxrank respectively, and also check whether the instance has a rank with hasrank, which returns true or false.","category":"page"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"julia> hasrank(ecoli)\ntrue\n\njulia> hasrank(uncl)\nfalse\n\njulia> taxrank(ecoli)\n:species\n\njulia> taxrank(uncl)\nmissing","category":"page"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"For compatibility with other tools, converting a Taxon to a String will return the name prepended with the first letter of the taxonomic rank and 2 underscores. You can convert back using taxon (note the lowercase 't'):","category":"page"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"julia> String(uncl)\n\"u__Unknown_bug\"\n\njulia> String(ecoli)\n\"s__Escherichia_coli\"\n\njulia> String(ecoli) |> Taxon\nTaxon(\"s__Escherichia_coli\", missing)\n\njulia> String(ecoli) |> taxon\nTaxon(\"Escherichia_coli\", :species)","category":"page"},{"location":"samples_features/#GeneFunction","page":"Samples and features","title":"GeneFunction","text":"","category":"section"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"The GeneFunction type contains a name and (optionally) a Taxon. In addiction to providing both a name and Taxon, you can instantiate a GeneFunction with just a name (in which case the taxon will be missing), or with the name of the taxon (in which case it will not have a rank).","category":"page"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"julia> gf1 = GeneFunction(\"gene1\")\nGeneFunction(\"gene1\", missing)\n\njulia> gf2 = GeneFunction(\"gene2\", \"Species_name\")\nGeneFunction(\"gene2\", Taxon(\"Species_name\", missing))\n\njulia> gf3 = GeneFunction(\"gene2\", Taxon(\"Species_name\", :species))\nGeneFunction(\"gene2\", Taxon(\"Species_name\", :species))","category":"page"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"You can access or check for various fields using similar methods as for Taxon:","category":"page"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"julia> hastaxon(gf1)\nfalse\n\njulia> hastaxon(gf2)\ntrue\n\njulia> hasrank(gf2)\nfalse\n\njulia> hasrank(gf3)\ntrue\n\njulia> name(gf3)\n\"gene2\"\n\njulia> taxon(gf3)\nTaxon(\"Species_name\", :species)\n\njulia> taxrank(gf3)\n:species","category":"page"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"For compatibility with other tools, Converting a GeneFunction to a String if it has a Taxon will include the taxon name separated by |. Converting back can be done using genefunction (note the lowercase g and f).","category":"page"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"julia> String(gf3)\n\"gene2|s__Species_name\"\n\njulia> genefunction(String(gf3))\nGeneFunction(\"gene2\", Taxon(\"Species_name\", :species))","category":"page"},{"location":"samples_features/#Types-and-Methods","page":"Samples and features","title":"Types and Methods","text":"","category":"section"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"MicrobiomeSample\nmetadata","category":"page"},{"location":"samples_features/#Microbiome.MicrobiomeSample","page":"Samples and features","title":"Microbiome.MicrobiomeSample","text":"MicrobiomeSample(name::String, metadata::Dictionary{Symbol, T}) <: AbstractSample\nMicrobiomeSample(name::String; kwargs...)\nMicrobiomeSample(name::String)\n\nMicrobiome sample type that includes a name and a Dictionary of arbitrary metadata using Symbols (other than :name or :metadata) as keys.\n\nMetadata can be accessed using getproperty or getindex on the sample itself.\n\nSamples can be instantiated with only a name, leaving the metadata Dictionary blank\n\nAdding or changing metadata follows the same rules as for the normal Dictionary.\n\n\n\n\n\n","category":"type"},{"location":"samples_features/#Microbiome.metadata","page":"Samples and features","title":"Microbiome.metadata","text":"metadata(t::AbstractSample)\n\nGet the metadata field from an AbstractSample. Note that this is not a copy, so modifications to the returned value will update the parent AbstractSample as well.\n\n\n\n\n\nmetadata(commp::CommunityProfile)\n\nReturns iterator of NamedTuple per sample, where keys are :sample and each metadata key found in commp. Samples without given metadata are filled with missing.\n\nReturned values can be passed to any Tables.rowtable - compliant type, eg DataFrame. ```\n\n\n\n\n\n","category":"function"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"Taxon\nname\nhasrank\ntaxrank\ntaxon","category":"page"},{"location":"samples_features/#Microbiome.Taxon","page":"Samples and features","title":"Microbiome.Taxon","text":"Taxon(name::String, rank::Union{Missing, Symbol, Int}) <: AbstractFeature\nTaxon(name::String)\n\nMicrobial taxon with a name and a rank that can be one of \n\n:domain\n:kingom\n:phylum\n:class\n:order\n:faamily\n:genus\n:species\n:subspecies\n:strain\n\nor missing. Contructors can also use numbers 0-9, or pass a string alone (in which case the taxon will be stored as missing)\n\n\n\n\n\n","category":"type"},{"location":"samples_features/#Microbiome.name","page":"Samples and features","title":"Microbiome.name","text":"name(t::Union{AbstractSample, AbstractFeature})\n\nGet the name field from an AbstractSample or AbstractFeature.\n\n\n\n\n\n","category":"function"},{"location":"samples_features/#Microbiome.hasrank","page":"Samples and features","title":"Microbiome.hasrank","text":"hasrank(t::Taxon)::Bool\n\nPretty self-explanatory.\n\n\n\n\n\nhasrank(t::GeneFunction)::Bool\n\nPretty self-explanatory.\n\n\n\n\n\n","category":"function"},{"location":"samples_features/#Microbiome.taxrank","page":"Samples and features","title":"Microbiome.taxrank","text":"taxrank(t::Union{Taxon, missing})\n\nGet the rank field from an Taxon. Returns missing if the rank is not set.\n\n\n\n\n\ntaxrank(gf::GeneFunction)\n\nGet the rank field from the Taxon, if gf has one. Returns missing if the taxon or rank is not set.\n\n\n\n\n\n","category":"function"},{"location":"samples_features/#Microbiome.taxon","page":"Samples and features","title":"Microbiome.taxon","text":"taxon(::AbstractString)\n\nReturn a Taxon from a string representation. If the string contains taxonomic rank information in the form \"x__Thename\" where x is the first letter of the rank, this information will be used.\n\nExamples\n\njulia> taxon(\"Unknown\")\nTaxon(\"Unknown\", missing)\n\njulia> taxon(\"s__Prevotella_copri\")\nTaxon(\"Prevotella_copri\", :species)\n\n\n\n\n\ntaxon(t::GeneFunction)\n\nGet the taxon field from a GeneFunction. Returns missing if the taxon is not set.\n\n\n\n\n\n","category":"function"},{"location":"samples_features/","page":"Samples and features","title":"Samples and features","text":"GeneFunction\ngenefunction","category":"page"},{"location":"samples_features/#Microbiome.GeneFunction","page":"Samples and features","title":"Microbiome.GeneFunction","text":"GeneFunction(name::String, taxon::Union{Taxon, String, Missing}) <: AbstractFeature\nGeneFunction(name::String)\n\nMicrobial gene function object with optional stratification (taxon).\n\n\n\n\n\n","category":"type"},{"location":"samples_features/#Microbiome.genefunction","page":"Samples and features","title":"Microbiome.genefunction","text":"genefunction(n::AbstractString)\n\nMake a gene function from a string, Converting anything after an initial | as a Taxon.\n\n\n\n\n\n","category":"function"},{"location":"#Microbiome.jl","page":"Home","title":"Microbiome.jl","text":"","category":"section"},{"location":"#Description","page":"Home","title":"Description","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Microbiome.jl is a package for manipulating and analyzing microbiome and microbial community data.","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Install Microbiome from the Julia REPL:","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> using Pkg\n\njulia> pkg\"add Microbiome\"","category":"page"},{"location":"","page":"Home","title":"Home","text":"If you are interested in the cutting edge of the development, please check out the master branch to try new features before release.","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> pkg\"add Microbiome#master\"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Pages=[\"samples_features.md\", \"profiles.md\", \"diversity.md\"]\nDepth=2","category":"page"}]
}
