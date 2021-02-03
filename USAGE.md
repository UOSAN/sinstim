## Usage

After `sinstim` is deployed, it is used with Amazon mTurk to recruit workers
to complete the eligibility and picture surveys.

Workers have two possible additional qualifications, one named `completedRating`
and one named `SinStim Eligible for Rating`. Any worker can complete the
eligibility survey, and workers that have completed the eligibility survey
and have indicated they have experience with an item in the eligibility survey
can complete the picture survey.

### Eligibility survey
First, create a "New Batch with an Existing Project" using the SinStim Eligibility
project. This task pays a small amount ($0.50) and requires that the worker
have neither of the additional qualifications. Set up the batch to collect
200 or 300 results. Then publish the batch and collect results.

After all the surveys are completed, download the CSV of the results from
the "Review Results" page, so you can examine all the results in the batch.
Approve or reject the assignments as appropriate. I query the sinstim database
to verify that the worker has completed the survey and the worker's eligibilities
have been recorded. If they have not been recorded, I reject the assignment.
Upload the modified CSV, that has the acceptance or rejection of the assignments.

You also have to download the workers results file, so you can modify the
`SinStim Eligible for Rating` qualification for the workers whose assignment
was accepted. In the column titled `UPDATE-SinStim Eligible for Rating`, set
the value to 100 for each worker whose assignment was accepted. For any workers
whose assignment was rejected, fill in the `UPDATE BlockStatus` to `Blocked`
and put a reason in the `BlockReason` column. Updating this file is trickier
because it contains all the workers that you have used, and not just the ones
from the most recent batch.

Next, upload those two files back to mTurk. Uploading the batch results will
result in paying the workers. Uploading the workers file will allow those users
to participate in the picture rating survey.

### Picture survey
Follow a similar procedure to the eligibility survey. Create a "New Batch with
an Existing Project" using the SinStim Rating project. This task pays a larger
amount ($5.50) and requires that the worker have has the `SinStim Eligible
for Rating` qualification. Publish the batch and collect results.

fter all the surveys are completed, download the CSV of the results from
the "Review Results" page, so you can examine all the results in the batch.
Approve or reject the assignments as appropriate. I query the sinstim database
to verify that the worker has rated 200 images. If the images have not been
rated, then I reject the assignment. Upload the modified CSV, that has the
acceptance or rejection of the assignments.

You also have to download the workers results file, so you can modify the
`completedRating` qualification for the workers whose assignment
was accepted. In the column titled `UPDATE-completedRating`, set
the value to 100 for each worker whose assignment was accepted. For any workers
whose assignment was rejected, fill in the `UPDATE BlockStatus` to `Blocked`
and put a reason in the `BlockReason` column. Updating this file is trickier
because it contains all the workers that you have used, and not just the ones
from the most recent batch.

Uploading the workers file is necessary to prevent workers from taking
the picture survey multiple times. We also pay a bonus of $1 for each completed
picture survey. The workers must be given a bonus manually, on the Manage ->
Workers page.